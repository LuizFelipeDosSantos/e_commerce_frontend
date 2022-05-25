/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { API_BASE_URL } from "../consts";

export function Cart() {
    const { user } = useContext(AuthContext);
    const [ cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        async function fetchCartProducts() {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/shopping/cart`,  {params: {userId: user._id}});
                if (!data) return;
                const { items } = data;
                setCartProducts(items);
            } catch (error) {
                console.log(error.response.data.errorMessage);
            }
        }
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

    return ( 
        <div className="productList">
            <div>
                <h2>Cart</h2>
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
                    })}
            </ul>
        </div>
     )
}