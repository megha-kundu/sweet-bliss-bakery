import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.join(projectRoot, '..', 'dist');
app.use(express.static(frontendDist));

const schemaOptions = { timestamps: true };
const productSchema = new mongoose.Schema({
    title: { type: String, required: true }, category: { type: String, required: true },
    price: { type: Number, required: true }, image: String, description: String,
    featured: Boolean, createdAt: { type: Date, default: Date.now },
}, schemaOptions);
const userSchema = new mongoose.Schema({
    name: String, email: { type: String, unique: true }, password: String,
}, schemaOptions);
const orderSchema = new mongoose.Schema({
    customer: { name: String, email: String, address: String, phone: String },
    items: [{ productId: String, title: String, price: Number, quantity: Number }],
    total: Number, status: { type: String, default: 'received' },
}, schemaOptions);

const atlasUri = process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI;
const localUri = process.env.MONGODB_LOCAL_URI || (!atlasUri ? 'mongodb://127.0.0.1:27017/sweet-bliss' : null);
const localDb = localUri ? mongoose.createConnection(localUri) : null;
const atlasDb = atlasUri && !atlasUri.includes('<username>') ? mongoose.createConnection(atlasUri, { serverSelectionTimeoutMS: 5000 }).useDb('bakery') : null;
const primaryDb = localDb || atlasDb;
const localModels = { Product: primaryDb.model('Product', productSchema), User: primaryDb.model('User', userSchema), Order: primaryDb.model('Order', orderSchema) };
const atlasModels = atlasDb ? { Product: atlasDb.model('Product', productSchema), User: atlasDb.model('User', userSchema), Order: atlasDb.model('Order', orderSchema) } : null;
const allModels = (name) => [...new Set([localModels[name], atlasModels?.[name]])].filter((Model) => Model?.db.readyState === 1);
const mirrorCreate = async (name, data) => Promise.all(allModels(name).map((Model) => Model.create(data)));

app.get('/api/health', (_req, res) => res.json({ ok: true, local: localDb?.readyState === 1 ? 'connected' : 'not configured', atlas: atlasDb?.readyState === 1 ? 'connected' : 'not configured' }));
app.get('/api/products', async (req, res) => {
    try {
        const filter = req.query.category ? { category: req.query.category } : {};
        res.json(await localModels.Product.find(filter).sort({ featured: -1, createdAt: -1 }));
    } catch (error) { res.status(500).json({ message: error.message }); }
});
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
        if (await localModels.User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: 'An account already exists for this email.' });
        const [user] = await mirrorCreate('User', { name, email: email.toLowerCase(), password: await bcrypt.hash(password, 12) });
        res.status(201).json({ token: jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'development-secret'), user: { name: user.name, email: user.email } });
    } catch (error) { res.status(500).json({ message: error.message }); }
});
app.post('/api/auth/login', async (req, res) => {
    const user = await localModels.User.findOne({ email: req.body.email?.toLowerCase() });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password.' });
    res.json({ token: jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'development-secret'), user: { name: user.name, email: user.email } });
});
app.post('/api/orders', async (req, res) => {
    try {
        const { customer, items } = req.body;
        if (!customer?.name || !customer?.address || !items?.length) return res.status(400).json({ message: 'Customer details and cart items are required.' });
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const [order] = await mirrorCreate('Order', { customer, items, total });
        res.status(201).json({ id: order.id, total: order.total, status: order.status });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(frontendDist, 'index.html')));

const port = process.env.PORT || 5000;
primaryDb.asPromise().then(() => (localDb && atlasDb ? atlasDb.asPromise().catch((error) => console.error(`Atlas unavailable; local database remains active: ${error.message}`)) : undefined))
    .then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`)))
    .catch((error) => { console.error(`MongoDB connection failed: ${error.message}`); process.exit(1); });
