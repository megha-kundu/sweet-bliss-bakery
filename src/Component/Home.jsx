import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <p className="eyebrow">Baked fresh every morning</p>
                    <h1>Good things take time. Great cake takes butter.</h1>
                    <p>Hand-finished cakes, warm pastries, and little moments of sweetness made in our kitchen.</p>

                    <button
                        onClick={() =>
                            document
                                .getElementById("order")
                                .scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Explore the menu
                    </button>
                </div>
            </section>

            <section className="featured" id="order">
                <div className="section-heading"><div><p className="eyebrow">The counter is open</p><h2>Choose your kind of happy</h2></div><p>From celebration cakes to a box of cookies for the journey home.</p></div>

                <div className="grid">

                    <Link to="/cake" className="card">
                        <img src="/cakee.avif" alt="Cake" />
                        <div className="overlay"><span>Cakes</span><small>Celebration, layered & lovely</small></div>
                    </Link>

                    <Link to="/donut" className="card">
                        <img src="/donutt.webp" alt="Donut" />
                        <div className="overlay"><span>Donuts</span><small>Glazed, filled & fresh</small></div>
                    </Link>

                    <Link to="/chocolate" className="card">
                        <img src="/chocos.webp" alt="Chocolate" />
                        <div className="overlay"><span>Chocolate</span><small>Rich little indulgences</small></div>
                    </Link>
                    <Link to="/cookies" className="card">
                        <img src="/cookiee.jpg" alt="Cookies" />
                        <div className="overlay"><span>Cookies</span><small>Made for sharing</small></div>
                    </Link>

                    <Link to="/cupcake" className="card">
                        <img src="/cuppc.jpg" alt="Cupcake" />
                        <div className="overlay"><span>Cupcakes</span><small>Small cakes, big joy</small></div>
                    </Link>
                    <Link to="/icecream" className="card">
                        <img src="/icecream.avif" alt="Ice Cream" />
                        <div className="overlay"><span>Ice cream</span><small>Cold, creamy, dreamy</small></div>
                    </Link>

                </div>
            </section>


            <section className="promise">
                <div><p className="eyebrow">Why Sweet Bliss</p><h2>A bakery for the moments worth remembering.</h2></div>
                <div className="promise-list"><p><strong>01</strong><span>Small batches</span><small>We bake with care, never by conveyor belt.</small></p><p><strong>02</strong><span>Real ingredients</span><small>Butter, cream, fruit and chocolate you can taste.</small></p><p><strong>03</strong><span>Made to order</span><small>Fresh from our oven to your table.</small></p></div>
            </section>

            <section className="extras">

                <div className="box">
                    <p className="eyebrow">This week at the bakery</p><h2>Sweeten the weekend</h2>
                    <p>Take home a little extra joy with 20% off selected boxes.</p>
                    <button onClick={() => document.getElementById("order").scrollIntoView({ behavior: "smooth" })}>Shop the counter</button>
                </div>

                <div className="box">
                    <p className="eyebrow">For your big days</p><h2>Make it personal</h2>
                    <p>Tell us the occasion and we will help you create the centrepiece.</p>
                    <button onClick={() => document.getElementById("order").scrollIntoView({ behavior: "smooth" })}>Find a cake</button>
                </div>

            </section>

            <footer className="footer">
                <p>Sweet Bliss Bakery · Baked with intention · Est. 2026</p>
            </footer>
        </>
    );
};

export default Home;