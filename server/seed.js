import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const productSchema = new mongoose.Schema({ title: String, category: String, price: Number, image: String, description: String, featured: Boolean, createdAt: { type: Date, default: Date.now } });
const catalog = [
    ['Cherry Cream Cake', 'cake', 599, '/cake 1.jpg'], ['Chocolate Tiramisu Cake', 'cake', 699, '/cake2.jpeg'], ['Red Velvet Cake', 'cake', 649, '/cake3.jpg'],
    ['Cherry Chocolate', 'chocolate', 249, '/choco1.jpg'], ['Dark Chocolate', 'chocolate', 199, '/choco2.avif'], ['Strawberry Chocolate', 'chocolate', 229, '/choco3.jpg'],
    ['Glazed Berry Donut', 'donut', 129, '/donut1.jpg'], ['Caramel Crunch Donut', 'donut', 149, '/donut2.jpg'], ['Classic Sprinkle Donut', 'donut', 99, '/donut3.jpg'],
    ['Vanilla Dream Cupcake', 'cupcake', 99, '/cup1.jpg'], ['Red Velvet Cupcake', 'cupcake', 119, '/cup2.jpg'], ['Chocolate Swirl Cupcake', 'cupcake', 109, '/cup3.jpg'],
    ['Butter Cookies', 'cookies', 199, '/cookie1.jpg'], ['Chocolate Chip Cookies', 'cookies', 229, '/cookie2.jpg'], ['Almond Shortbread', 'cookies', 249, '/cookie3.jpg'],
    ['Mango Gelato', 'icecream', 179, '/ice1.jpg'], ['Berry Sundae', 'icecream', 199, '/ice2.avif'], ['Chocolate Fudge Scoop', 'icecream', 189, '/ice3.jpg'],
].map(([title, category, price, image], index) => ({ title, category, price, image, featured: index < 6, description: 'Made fresh in small batches with excellent ingredients.' }));
const localDb = await mongoose.createConnection(process.env.MONGODB_LOCAL_URI || 'mongodb://127.0.0.1:27017/sweet-bliss').asPromise();
const atlasUri = process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI;
const connections = [localDb];
if (atlasUri && !atlasUri.includes('<username>')) {
    const atlasDb = mongoose.createConnection(atlasUri, { serverSelectionTimeoutMS: 5000 }).useDb('bakery');
    try { await atlasDb.asPromise(); connections.push(atlasDb); }
    catch (error) { console.error(`Atlas unavailable; seeding local database only: ${error.message}`); await atlasDb.close(); }
}
for (const connection of connections) {
    const Product = connection.model('Product', productSchema);
    await Product.deleteMany({});
    await Product.insertMany(catalog);
}
console.log(`Seeded ${catalog.length} products into ${connections.length} database(s).`);
await Promise.all(connections.map((connection) => connection.close()));
