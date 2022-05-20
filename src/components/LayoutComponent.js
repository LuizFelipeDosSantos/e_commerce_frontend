import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";

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
      <nav className="navbar">
        <div>
          <p>E-Commerce</p>
        </div>

        <NavLink to="/home">
          <div>
            <p>Home</p>
          </div>
        </NavLink>

        <NavLink to="/address/list">
          <div>
            <p>Adresses</p>
          </div>
        </NavLink>

        <NavLink to="/home">
          <div>
            <p>Wishlist</p>
          </div>
        </NavLink>

        <NavLink to="/home">
          <div>
            <p>Cart</p>
          </div>
        </NavLink>

        <button onClick={logout}>
          <div>
            <p>Logout</p>
          </div>
        </button>

    </nav>

      <Outlet />
    </div>
  );
}
