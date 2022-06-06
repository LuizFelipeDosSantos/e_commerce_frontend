/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { API_BASE_URL } from "../consts";

export function Checkout() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [ cartProducts, setCartProducts] = useState([]);
    const [ adresses, setAdresses ] = useState([]);
    const [ selectedAddress, setSelectedAddress ] = useState("");
    const [ totalAmount, setTotalAmount ] = useState(0);

    useEffect(() => {
        function getTotalAmount(items) {
            return items.reduce((accAmount, curItem) => accAmount + (curItem.product.price * curItem.quantity), 0);
        }

        async function fetchAdresses() {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/user/address/list`,  {params: {userId: user._id}});
                if (!data) return;
                const { adresses } = data;
                setSelectedAddress(adresses[0]._id);
                setAdresses(adresses);
            } catch (error) {
                console.log(error.response.data.errorMessage);
            }
        }

        async function fetchCartProducts() {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/shopping/cart`,  {params: {userId: user._id}});
                if (!data) return;
                const { items } = data.cart;
                setCartProducts(items);
                setTotalAmount(getTotalAmount(items));
            } catch (error) {
                console.log(error.response.data.errorMessage);
            }
        }

        fetchAdresses();
        fetchCartProducts();
    }, []);

    async function removeProductCart(productId, amount) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/shopping/cart/removeProduct`, 
                                                {params: {userId: user._id,
                                                          productId,
                                                          amount}});
            setCartProducts(cartProducts.filter((cartProduct) => cartProduct.product._id !== productId));
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.errorMessage);
        }
    }

    async function checkout() {
        try {
            const response = await axios.post(`${API_BASE_URL}/shopping/order/create`, { userId: user._id, 
                                                                                         addressId: selectedAddress,
                                                                                         amount: totalAmount,
                                                                                         items: cartProducts });
            console.log(response.data);
            navigate("/home");
          } catch (error) {
            console.log(error.response.data.errorMessage);
          }
    } 

    return ( 
        <div className="productList">
            <div>
                <h2>Checkout</h2>
            </div>

            <div>
                <h3>Address</h3>
            </div>

            <div>
                <ul>
                    {adresses &&
                        adresses.map((address) => {
                            return (
                                <li key={address._id}>
                                    <div>
                                        <h5>{address.street}</h5>
                                        <h5>{address.number}</h5>
                                        <h5>{address.zipCode}</h5>
                                        <h5>{address.city}</h5>
                                        <h5>{address.country}</h5>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div>
                <h3>Items</h3>
            </div>

            <ul>
                {cartProducts &&
                    cartProducts.map((cartProduct) => {
                        return (
                            <li key={cartProduct.product._id}>
                                <div>
                                    <Link to={"/product-detail"} state={ cartProduct.product }>
                                        <img src={cartProduct.product.imgUrl} alt="product img" width={100}/>
                                    </Link>
                                    <Link to={"/product-detail"}  state={ cartProduct.product }>
                                        <h4>{cartProduct.product.name}</h4>
                                    </Link>
                                    <h4>Quantity: {cartProduct.quantity}</h4>
                                    <h4>Amount: €{cartProduct.product.price * cartProduct.quantity}</h4>
                                    <button onClick={ () => removeProductCart(cartProduct.product._id,
                                                                              cartProduct.product.price * cartProduct.quantity) }> Remove from Cart</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>

            <h3>Total: €{totalAmount}</h3>

            <button onClick={ () => checkout() }> Checkout </button>
        </div>
     )
}