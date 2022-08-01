import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function Signup() {
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  function handleInput(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });  
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewUser(formState);
  };

  async function addNewUser() {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/auth/signup`, formState);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      setErrorState({ message: error.response.data.errorMessage });
    }
  }

  return (
    <div>
      <div className="divFormDefault">
        <br/>
        <h2>Sign up </h2>
        <br/>
        <br/>

        <Form className="formDefault" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGridFirstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control 
              required
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleInput}
              placeholder="Enter your first name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridLastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control 
              required
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleInput}
              placeholder="Enter your last name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
              required
              type="text"
              name="username"
              value={formState.username}
              onChange={handleInput}
              placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control 
              required
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInput}
              placeholder="Enter your email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              required
              type="password"
              name="password"
              value={formState.password}
              title="Password must contain at least 8 characters, including at least one uppercase, one lowercase and one number."
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange={handleInput}
              autoComplete={"new-password"}
              placeholder="Enter password" />
          </Form.Group>

          <Button variant="primary" type="submit" size="lg">
            Sign up
          </Button>
        </Form>

        {/* <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              required
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleInput}
              placeholder="Enter your first name"
            />

            <br/>
            <label>Last Name:</label>
            <input
              required
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleInput}
              placeholder="Enter your last name"
            />

            <br/>
            <label>Username:</label>
            <input
              required
              type="text"
              name="username"
              value={formState.username}
              onChange={handleInput}
              placeholder="Enter a username"
            />

            <br/>
            <label>Email:</label>
            <input
              required
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInput}
              placeholder="Enter an email"
            />

            <br/>
            <label>Password:</label>
            <input
              required
              type="password"
              name="password"
              value={formState.password}
              title="Password must contain at least 8 characters, including at least one uppercase, one lowercase and one number."
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              onChange={handleInput}
              autoComplete={"new-password"}
              placeholder="Enter a password"
            />
          </div>
          <br/>

          <button type="submit"> Sign up </button>
        </form> */}
        {errorState && <h2>{errorState.message}</h2>}
      </div>
    </div>
  );
}
