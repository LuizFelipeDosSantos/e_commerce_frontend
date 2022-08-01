import axios from "axios";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { API_BASE_URL } from "../consts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function EditAddress() {
  const navigate = useNavigate();
  const { _id, street, number, zipCode, city, country} = useLocation().state.address;
  const { user } = useContext(AuthContext);
  const [errorState, setErrorState] = useState();
  const [formState, setFormState] = useState({ _id, street, number, zipCode, city, country });

  function handleInput(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });  
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    editAddress(formState);
  };

  async function editAddress() {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/address/edit`, { userId: user._id, 
                                                                              address: formState });
      console.log(response.data);
      navigate("/address/list");
    } catch (error) {
      setErrorState({ message: error.response.data.errorMessage });
    }
  }

  return (
    <div className="divFormDefault">
      <div>
        <h2>Edit Address </h2>

        <Form className="formDefault" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGridStreet">
            <Form.Label>Street:</Form.Label>
            <Form.Control 
              required
              type="text"
              name="street"
              value={formState.street}
              onChange={handleInput}
              placeholder="Enter Street Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridNumber">
            <Form.Label>Number:</Form.Label>
            <Form.Control 
              required
              type="text"
              name="number"
              value={formState.number}
              onChange={handleInput}
              placeholder="Enter Number" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridZipCode">
            <Form.Label>Zip Code:</Form.Label>
            <Form.Control 
              required
              type="text"
              name="zipCode"
              value={formState.zipCode}
              onChange={handleInput}
              placeholder="Enter Zip Code" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridCity">
            <Form.Label>City:</Form.Label>
            <Form.Control 
              required
              type="text"
              name="city"
              value={formState.city}
              onChange={handleInput}
              placeholder="Enter City" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridCountry">
            <Form.Label>Country:</Form.Label>
            <Form.Control 
              required
              type="text"
              name="country"
              value={formState.country}
              onChange={handleInput}
              placeholder="Enter Country" />
          </Form.Group>

          <Button variant="success" type="submit" size="lg">
            Save
          </Button>
        </Form>

        {/*<form onSubmit={handleSubmit}>
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

          <button type="submit"> Save </button>
        </form>*/}
        {errorState && <h2>{errorState.message}</h2>}
      </div>
    </div>
  );
}
