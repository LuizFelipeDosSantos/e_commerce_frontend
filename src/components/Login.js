import axios from "axios";
import { useState, useContext } from "react";
import { API_BASE_URL } from "../consts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      const response = await axios.post(`${API_BASE_URL}/user/auth/login`, formState);
      console.log(response.data.user);
      addUserToContext(response.data.user);
      navigate("/home");
    } catch (error) {
      setErrorState({ message: error.response.data.errorMessage });
    }
  }

  return (
    <div>
      <div className="divFormDefault">
        <br/>
        <h2>E-Commerce</h2>
        <br/>
        <br/>

        <Form className="formDefault" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control 
              type="email"
              name="email"
              autoComplete="email"
              value={formState.email}
              onChange={handleInput}
              placeholder="Enter your Email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="password"
              name="password"
              autoComplete={"current-password"}
              value={formState.password}
              onChange={handleInput}
              placeholder="Enter your Password" />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">Log In</Button>
            <Button href="/signup" style={{backgroundColor: 'orange'}}>Sign up</Button>
          </div>
        </Form>

        {/* <form onSubmit={handleSubmit}>

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
        </form> */}
        {errorState && <h2>{errorState.message}</h2>}
      </div>
    </div>
  );
}
