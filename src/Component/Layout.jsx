import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useState } from "react";
import { login, signup } from "../api";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fffafc;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; /* buttons stay on right */
  padding: 20px 40px;
  background: #ec315dda;
  position: relative; /* allows absolute positioning for the title */
 
  @media (max-width: 768px) {
  flex-direction: column-reverse;
  gap: 10px;
  padding: 15px;
}
`;


const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Arial', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  color: #f6e9ec;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px #fff;
  text-align: center;

 @media (max-width: 768px) {
  position: static;
  transform: none;
  font-size: 1.5rem;
  margin-bottom: 10px;
}
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const Cart = styled.div`
  background: white;
  color: #ff3399;
  font-weight: bold;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #ff3399;
    color: white;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const AuthBtn = styled.button`
  padding: 8px 18px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background: white;
  color: #ff3399;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    background: #ef155a;
    color: white;
  }
`;
const Nav = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  flex-wrap: wrap;
`;

const Btn = styled.button`
  background: ${props => (props.active ? "#ff4d6d" : "#ff99cc")};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
`;

const Layout = () => {
  const { cart } = useContext(CartContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("sweet-bliss-user") || "null"));
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const closeAuth = () => {
    setShowLogin(false);
    setShowSignup(false);
    setAuthError("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = await login(loginForm);
      localStorage.setItem("sweet-bliss-token", result.token);
      localStorage.setItem("sweet-bliss-user", JSON.stringify(result.user));
      setUser(result.user);
      closeAuth();
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = await signup(signupForm);
      localStorage.setItem("sweet-bliss-token", result.token);
      localStorage.setItem("sweet-bliss-user", JSON.stringify(result.user));
      setUser(result.user);
      closeAuth();
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("sweet-bliss-token");
    localStorage.removeItem("sweet-bliss-user");
    setUser(null);
  };

  return (
    <Container>
      <Header>
        <Title>🍬 Sweet World 🍬</Title>

        <RightSection>
          <Cart>🛒 {cart.length}</Cart>
          <AuthButtons>
            {user ? <><span style={{ color: "white", fontWeight: "bold" }}>Hi, {user.name}</span><AuthBtn onClick={logout}>Logout</AuthBtn></> : <><AuthBtn onClick={() => { setAuthError(""); setShowLogin(true); }}>Login</AuthBtn><AuthBtn onClick={() => { setAuthError(""); setShowSignup(true); }}>Sign Up</AuthBtn></>}
          </AuthButtons>
        </RightSection>
      </Header>

      <Nav>
        <NavLink to="/" end>
          {({ isActive }) => <Btn active={isActive}>Home</Btn>}
        </NavLink>

        <NavLink to="/cake">
          {({ isActive }) => <Btn active={isActive}>Cake</Btn>}
        </NavLink>

        <NavLink to="/donut">
          {({ isActive }) => <Btn active={isActive}>Donut</Btn>}
        </NavLink>

        <NavLink to="/chocolate">
          {({ isActive }) => <Btn active={isActive}>Chocolate</Btn>}
        </NavLink>
        <NavLink to="cookies">
          {({ isActive }) => <Btn active={isActive}>Cookies</Btn>}
        </NavLink>

        <NavLink to="cupcake">
          {({ isActive }) => <Btn active={isActive}>Cupcake</Btn>}
        </NavLink>
        <NavLink to="/icecream">
          {({ isActive }) => <Btn active={isActive}>Ice Cream</Btn>}
        </NavLink>

        <NavLink to="/cart">
          {({ isActive }) => <Btn active={isActive}>Cart</Btn>}
        </NavLink>
      </Nav>

      <Outlet context={{ user, openAuth: () => { setAuthError(""); setShowLogin(true); } }} />
      {/* LOGIN POPUP */}
      {showLogin && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
          onClick={() => setShowLogin(false)}
        >
          <form
            onSubmit={handleLogin}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              width: "300px",
              textAlign: "center"
            }}
          >
            <h3>Login</h3>
            <input required type="email" placeholder="Email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} style={{ width: "100%", margin: "10px 0", padding: "8px" }} />
            <input required minLength="6" type="password" placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} style={{ width: "100%", margin: "10px 0", padding: "8px" }} />

            <button type="submit" disabled={authLoading} style={{ width: "100%", padding: "10px", background: "#ff4d6d", color: "white", border: "none", borderRadius: "10px" }}>
              {authLoading ? "Signing in..." : "Login"}
            </button>
            {authError && <p role="alert" style={{ color: "#c9184a", marginTop: "10px" }}>{authError}</p>}

            <button
              type="button"
              onClick={closeAuth}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #ff4d6d",
                background: "transparent",
                color: "#ff4d6d",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#ff4d6d";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#ff4d6d";
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* SIGNUP POPUP */}
      {showSignup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
          onClick={() => setShowSignup(false)}
        >
          <form
            onSubmit={handleSignup}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              width: "300px",
              textAlign: "center"
            }}
          >
            <h3>Sign Up</h3>
            <input required placeholder="Name" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} style={{ width: "100%", margin: "10px 0", padding: "8px" }} />
            <input required type="email" placeholder="Email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} style={{ width: "100%", margin: "10px 0", padding: "8px" }} />
            <input required minLength="6" type="password" placeholder="Password (6+ characters)" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} style={{ width: "100%", margin: "10px 0", padding: "8px" }} />

            <button type="submit" disabled={authLoading} style={{ width: "100%", padding: "10px", background: "#ff4d6d", color: "white", border: "none", borderRadius: "10px" }}>
              {authLoading ? "Creating account..." : "Sign Up"}
            </button>
            {authError && <p role="alert" style={{ color: "#c9184a", marginTop: "10px" }}>{authError}</p>}

            <button
              type="button"
              onClick={closeAuth}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #ff4d6d",
                background: "transparent",
                color: "#ff4d6d",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#ff4d6d";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#ff4d6d";
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </Container>
  );
};

export default Layout;