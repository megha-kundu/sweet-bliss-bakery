import styled from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Section = styled.div`
  padding: 60px 20px;
  background: #fffafc;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 36px;
  color: #c9184a;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  max-width: 1100px;
  margin: auto;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  transition: 0.3s;

  &:hover {
    transform: translateY(-8px);
  }

  img {
    width: 100%;
    height: 230px;
    object-fit: cover;
  }

  .content {
    padding: 18px;
  }

  .price {
    font-weight: bold;
    color: #ff4d6d;
    margin-bottom: 10px;
  }

  .btns {
    display: flex;
    gap: 10px;
  }

  button {
    flex: 1;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
  }

  .order {
    background: #ff4d6d;
    color: white;
  }

  .cart {
    border: 1px solid #ff4d6d;
    color: #ff4d6d;
    background: transparent;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background: white;
  padding: 25px;
  border-radius: 20px;
  text-align: center;

  input {
    display: block;
    margin: 10px auto;
    padding: 8px;
    width: 80%;
  }

  button {
    margin: 10px;
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }

  .buy {
    background: #ff4d6d;
    color: white;
  }

  .book {
    background: #ffd6e0;
  }
`;

const Cupcake = () => {

    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const items = [
        { image: "/cup1.jpg", title: "Chocolate Cupcake", price: "₹99" },
        { image: "/cup2.jpg", title: "Vanilla Cream Cupcake", price: "₹89" },
        { image: "/cup3.jpg", title: "Strawberry Cupcake", price: "₹109" },
        { image: "/cup5.jpg", title: "Cherry Cupcake", price: "₹119" },
        { image: "/cup4.jpg", title: "Blackberry Cupcake", price: "₹129" },
        { image: "/cup6.jpg", title: "Plain soft Cupcake", price: "₹139" }
    ];

    return (
        <Section>
            <Title>Cupcake Collection 🧁</Title>

            <Grid>
                {items.map((item, index) => (
                    <Card key={index}>
                        <img src={item.image} />

                        <div className="content">
                            <h3>{item.title}</h3>
                            <div className="price">{item.price}</div>

                            <div className="btns">
                                <button className="order" onClick={() => setSelectedItem(item)}>
                                    Order
                                </button>

                                <button className="cart" onClick={() => addToCart(item)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </Grid>

            {selectedItem && (
                <Popup onClick={() => setSelectedItem(null)}>
                    <Box onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedItem.title}</h3>
                        <p>{selectedItem.price}</p>

                        <button
                            className="buy"
                            onClick={() =>
                                navigate("/checkout", { state: selectedItem })
                            }
                        >
                            Buy Now
                        </button>

                        <button
                            className="book"
                            onClick={() => setShowForm(true)}
                        >
                            Book Order
                        </button>
                    </Box>
                </Popup>
            )}

            {showForm && (
                <Popup onClick={() => setShowForm(false)}>
                    <Box onClick={(e) => e.stopPropagation()}>
                        <h3>Book Order</h3>
                        <input placeholder="Your Name" />
                        <input placeholder="Address" />

                        <button className="buy">Submit</button>
                        <button onClick={() => setShowForm(false)}>Cancel</button>
                    </Box>
                </Popup>
            )}
        </Section>
    );
};

export default Cupcake;