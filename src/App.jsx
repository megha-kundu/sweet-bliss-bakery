import { Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout";
import Home from "./Component/Home";
import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout";
import ProductCatalog from "./Component/ProductCatalog";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chocolate" element={<ProductCatalog category="chocolate" title="Chocolate Collection" />} />
        <Route path="icecream" element={<ProductCatalog category="icecream" title="Ice Cream Collection" />} />
        <Route path="cake" element={<ProductCatalog category="cake" title="Cake Collection" />} />
        <Route path="donut" element={<ProductCatalog category="donut" title="Donut Collection" />} />
        <Route path="cupcake" element={<ProductCatalog category="cupcake" title="Cupcake Collection" />} />
        <Route path="cookies" element={<ProductCatalog category="cookies" title="Cookie Collection" />} />
        <Route path="cart" element={<Cart />} />



        {/* ✅ ADD THIS ROUTE */}
        <Route path="checkout" element={<Checkout />} />

      </Route>
    </Routes>
  );
}

export default App;