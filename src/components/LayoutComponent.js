import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";

export function LayoutComponent() {
  const navigate = useNavigate();

  async function logout() {
    try {
      await axios.post(API_BASE_URL + "/user/auth/logout");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  } 

  return (
    <div>
    {
        <>
            <nav>
              <div>
                <p>TRIVIAHACK</p>
              </div>
    
              <>
                    <NavLink to="/home">
                        <div>
                            <i>play_circle</i>
                            <p>Home</p>
                        </div>
                    </NavLink>

                    <button onClick={logout}>
                        <div>
                            <i>logout</i>
                            <p>Logout</p>
                        </div>
                    </button>
                </>
            </nav>

            <Outlet />
        </>
    }
    </div>
  );
}
