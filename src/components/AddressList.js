import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../consts";

export function AddressList() {
    const [ addressList, setAddressList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAdresses() {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/address/list`);
                if (!data) return;
                const { adresses } = data;
                setAddressList(adresses);
            } catch (error) {
                console.log(error.response.data.errorMessage);
            }
        }
        fetchAdresses();
    }, []);

    return ( 
        <div className="addressList">
            <div>
                <h2>Adresses</h2>
            </div>

            <ul>
                {addressList &&
                    addressList.map((address) => {
                        return (
                            <li key={address._id}>
                                <div>
                                    <h4>{address.street}</h4>
                                    <h4>{address.number}</h4>
                                    <h4>{address.zipCode}</h4>
                                    <h4>{address.city}</h4>
                                    <h4>{address.country}</h4>
                                </div>
                            </li>
                        )
                    })}
            </ul>
            <button onClick={ () => navigate("/address/create") }>Create Address</button>
        </div>
     )
}