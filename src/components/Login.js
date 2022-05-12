import axios from "axios";
import { useState, useContext } from "react";
import { API_BASE_URL } from "../consts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";

export function Login() {
  const navigate = useNavigate();
  const { addUserToContext } = useContext(AuthContext);
  const [errorState, setErrorState] = useState();
  const [formState, setFormState] = useState({ email: "", password: "" });

  function handleInput(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(formState);
  };

  async function loginUser() {
    try {
      const response = await axios.post(API_BASE_URL + "/auth/login", formState);
      addUserToContext(response.data.user);
      navigate("/home");
    } catch (err) {
      console.log(err.response.data);
      setErrorState({ message: err.response.data.errorMessage });
    }
  }

  return (
    <div>
      <div>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>

          <div>
            <label>Email:</label>
            <br/>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={formState.email}
              onChange={handleInput}
              placeholder="Enter your Email"
            />
            <br/>
            <label>Password:</label>
            <br/>
            <input
              type="password"
              name="password"
              autoComplete={"current-password"}
              value={formState.password}
              onChange={handleInput}
              placeholder="Enter your Password"
            />
          </div>
          <p>
            Not registered yet? <a href="/signup">Join E-Commerce</a>
          </p>
          <button type="submit"> Log in </button>
        </form>
        {errorState && <h2>{errorState.message}</h2>}
      </div>
    </div>
  );
}
