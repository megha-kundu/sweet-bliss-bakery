import { useContext } from "react";
import { CartContext } from "./CartContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Section = styled.div`
  padding: 60px 20px;
  background: #fffafc;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 34px;
  color: #c9184a;
  margin-bottom: 30px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  max-width: 1100px;
  margin: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Items = styled.div``;

const Card = styled.div`
  display: flex;
  gap: 15px;
  background: white;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 15px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.08);

  img {
    width: 100px;
    height: 90px;
    object-fit: cover;
    border-radius: 10px;
  }
    .remove {
  margin-top: 8px;
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background: #ffe5ec;
  color: #c9184a;
  transition: 0.3s;
}

.remove:hover {
  background: #ffccd5;
  transform: scale(1.05);
}
`;

const Summary = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  height: fit-content;
  box-shadow: 0 6px 15px rgba(0,0,0,0.08);
`;

const Btn = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: #ff4d6d;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;

const Cart = () => {

    const { cart, removeFromCart, totalPrice } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <Section>
            <Title>🛒 Your Cart</Title>

            {cart.length === 0 ? (
                <p style={{ textAlign: "center" }}>Your cart is empty 😢</p>
            ) : (
                <Grid>

                    {/* LEFT SIDE ITEMS */}
                    <Items>
                        {cart.map((item, index) => (
                            <Card key={index}>
                                <img src={item.image} />

                                <div>
                                    <h4>{item.title}</h4>
                                    <p>₹{item.price} · Qty {item.quantity || 1}</p>

                                    <button
                                        className="remove"
                                        onClick={() => removeFromCart(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </Items>

                    {/* RIGHT SIDE SUMMARY */}
                    <Summary>
                        <h3>Price Details</h3>
                        <hr />

                        <p>Total Items: {cart.length}</p>
                        <p>Total Price: ₹{totalPrice}</p>

                        <Btn onClick={() => navigate("/checkout")}>
                            Place Order
                        </Btn>
                    </Summary>

                </Grid>
            )}
        </Section>
    );
};

export default Cart;