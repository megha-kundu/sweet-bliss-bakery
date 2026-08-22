import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { getProducts } from '../api';
import { CartContext } from './CartContext';

const Section = styled.main`padding: 76px clamp(20px, 5vw, 72px); background: #fbf6ef; min-height: 70vh;`;
const Heading = styled.div`max-width: 1180px; margin: 0 auto 38px; border-bottom: 1px solid #eadbca; padding-bottom: 28px;`;
const Title = styled.h2`font: 700 clamp(2.4rem, 5vw, 4.5rem)/.95 Georgia, serif; color: #3a1f1a; margin: 0;`;
const Intro = styled.p`color: #8a6258; margin-top: 12px; font-size: 1.05rem;`;
const Grid = styled.div`max-width: 1180px; margin: auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(235px, 1fr)); gap: 22px;`;
const Card = styled.article`background: #fffdf9; border: 1px solid #eadbca; overflow: hidden; transition: transform .25s, box-shadow .25s; &:hover { transform: translateY(-6px); box-shadow: 0 18px 35px #57211618; } img { width: 100%; height: 245px; object-fit: cover; display: block; } .body { padding: 20px; } h3 { color: #3a1f1a; margin: 0 0 8px; font: 700 1.2rem Georgia, serif; } p { color: #98776e; min-height: 38px; font-size: .9rem; line-height: 1.45; } .row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; } strong { color: #c45335; font-size: 1.1rem; margin-right: auto; } button { background: #c45335; color: white; border: 0; padding: 10px 11px; cursor: pointer; font-weight: 700; } button:last-child { background: transparent; border: 1px solid #c45335; color: #c45335; }`;
const ProductCatalog = ({ category, title }) => {
    const { addToCart } = useContext(CartContext);
    const { user, openAuth } = useOutletContext();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => { getProducts(category).then(setProducts).catch((err) => setError(err.message)); }, [category]);
    const requireAuth = (action) => { if (!user) { openAuth("login"); return; } action(); };
    return <Section><Heading><div><Title>{title}</Title><Intro>Small-batch sweetness, made fresh for your table.</Intro></div></Heading>{error && <p role="alert">{error} Start the API and seed the database to load products.</p>}<Grid>{products.map((item) => <Card key={item._id}><img src={item.image} alt={item.title} /><div className="body"><h3>{item.title}</h3><p>{item.description}</p><div className="row"><strong>₹{item.price}</strong><button onClick={() => requireAuth(() => { addToCart(item); navigate('/checkout'); })}>Order now</button><button onClick={() => requireAuth(() => addToCart(item))}>Add to cart</button></div></div></Card>)}</Grid>{!error && !products.length && <p>Loading today's bakes...</p>}</Section>;
};
export default ProductCatalog;
