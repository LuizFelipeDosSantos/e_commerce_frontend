import axios from "axios";
import { Link, /*NavLink,*/ Outlet, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function LayoutComponent() {
  const navigate = useNavigate();

  async function logout() {
    try {
      await axios.get(API_BASE_URL + "/user/auth/logout");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  } 

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/home">E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/address/list">Adresses</Nav.Link>
              <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>
              <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
              <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*<nav className="navbar">
        <NavLink to="/home">
          <div>
            <p>E-Commerce</p>
          </div>
        </NavLink>

        <NavLink to="/address/list">
          <div>
            <p>Adresses</p>
          </div>
        </NavLink>

        <NavLink to="/wishlist">
          <div>
            <p>Wishlist</p>
          </div>
        </NavLink>

        <NavLink to="/cart">
          <div>
            <p>Cart</p>
          </div>
        </NavLink>

        <NavLink to="/orders">
          <div>
            <p>Orders</p>
          </div>
        </NavLink>

        <button onClick={logout}>
          <div>
            <p>Logout</p>
          </div>
        </button>

    </nav>*/} 

      <Outlet />
    </div>
  );
}
