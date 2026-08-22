import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { createOrder } from "../api";
import { CartContext } from "./CartContext";

const Box = styled.div`
  max-width: 500px;
  margin: 50px auto;
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const Btn = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background: #ff4d6d;
  color: white;
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, setCart } = useContext(CartContext);
  const [details, setDetails] = useState({ name: "", email: "", address: "", phone: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const update = (event) => setDetails({ ...details, [event.target.name]: event.target.value });
  const submit = async () => {
    try { await createOrder({ customer: details, items: cart.map(({ _id, title, price, quantity }) => ({ productId: _id, title, price: Number(price), quantity: quantity || 1 })) }); setDone(true); setCart([]); }
    catch (submitError) { setError(submitError.message); }
  };
  if (!cart.length && !done) return <Box><h2>Your cart is empty</h2><Btn onClick={() => navigate("/cake")}>Browse cakes</Btn></Box>;

  return (
    <Box>
      <h2>Complete your order</h2>
      <p>Total: ₹{totalPrice}</p>

      <Input name="name" placeholder="Your name" value={details.name} onChange={update} />
      <Input name="email" type="email" placeholder="Email" value={details.email} onChange={update} />
      <Input name="phone" placeholder="Phone" value={details.phone} onChange={update} />
      <Input name="address" placeholder="Delivery address" value={details.address} onChange={update} />

      <Btn onClick={submit}>Confirm order</Btn>

      {error && <p role="alert">{error}</p>}
      {done && <p style={{ color: "green" }}>Order received. We will contact you shortly.</p>}

      <Btn onClick={() => navigate("/")}>Back Home</Btn>
    </Box>
  );
};

export default Checkout;