import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";

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
      const response = await axios.post(API_BASE_URL + "/auth/signup", {user: formState});
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      setErrorState({ message: err.response.data.errorMessage });
    }
  }

  return (
    <div>
      <div>
        <h2>Sign up </h2>

        <form onSubmit={handleSubmit}>
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
              title="Password must contain at least 6 characters, including at least one uppercase, one lowercase and one number."
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              onChange={handleInput}
              autoComplete={"new-password"}
              placeholder="Enter a password"
            />
          </div>
          <br/>

          <button type="submit"> Sign up </button>
        </form>
        {errorState && <h2>{errorState.message}</h2>}
      </div>
    </div>
  );
}
