import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { API_BASE_URL } from "../consts";

export function CreateAddress() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [errorState, setErrorState] = useState();
  const [formState, setFormState] = useState({
    street: "",
    number: "",
    zipCode: "",
    city: "",
    country: "",
  });

  function handleInput(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });  
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewAddress(formState);
  };

  async function createNewAddress() {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/address/create`, { userId: user._id, 
                                                                                 address: formState });
      console.log(response.data);
      navigate("/address/list");
    } catch (error) {
      setErrorState({ message: error.response.data.errorMessage });
    }
  }

  return (
    <div>
      <div>
        <h2>Create Address </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Street:</label>
            <input
              required
              type="text"
              name="street"
              value={formState.street}
              onChange={handleInput}
              placeholder="Enter Street Name"
            />

            <br/>
            <label>Number:</label>
            <input
              required
              type="number"
              name="number"
              value={formState.number}
              onChange={handleInput}
              placeholder="Enter Number"
            />

            <br/>
            <label>Zip Code:</label>
            <input
              required
              type="number"
              name="zipCode"
              value={formState.zipCode}
              onChange={handleInput}
              placeholder="Enter Zip Code"
            />

            <br/>
            <label>City:</label>
            <input
              required
              type="text"
              name="city"
              value={formState.city}
              onChange={handleInput}
              placeholder="Enter City"
            />

            <br/>
            <label>Country:</label>
            <input
              required
              type="text"
              name="country"
              value={formState.country}
              onChange={handleInput}
              placeholder="Enter Country"
            />
          </div>
          <br/>

          <button type="submit"> Create </button>
        </form>
        {errorState && <h2>{errorState.message}</h2>}
      </div>
    </div>
  );
}
