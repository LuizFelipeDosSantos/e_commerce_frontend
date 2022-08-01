/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { API_BASE_URL } from "../consts";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export function Cart() {
    const navigate = useNavigate(); 
    const { user } = useContext(AuthContext);
    const [ cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        async function fetchCartProducts() {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/shopping/cart`,  {params: {userId: user._id}});
                if (!data) return;
                const { items } = data.cart;
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
        <>  
            <div className="productList"> 
                <h2>Cart</h2>
                <br/>
                <br/>
                <Row xs={1} md={3} className="g-4">
                    {cartProducts &&
                        cartProducts.map((cartProduct) => {
                            return (
                                <Col key={cartProduct._id}>
                                    <Card bg="warning" className="productCard">
                                        <Card.Img variant="top" src={cartProduct.product.imgUrl}/>
                                        <Card.Body>
                                            <Card.Title>{cartProduct.product.name}</Card.Title>
                                            <Card.Text>Quantity: {cartProduct.quantity}</Card.Text>
                                            <Card.Text>Amount: €{cartProduct.product.price * cartProduct.quantity}</Card.Text>
                                        </Card.Body>
                                        <Link to={"/product-detail"} state={ cartProduct.product } class="stretched-link"></Link>
                                    </Card>
                                    <Button variant="danger" onClick={ () => removeProductCart(cartProduct.product._id,
                                                                                               cartProduct.product.price * cartProduct.quantity) }>Remove from Cart</Button>
                                </Col>
                            )
                        })}
                </Row>
                {cartProducts.length > 0 &&
                    <Button variant="success" onClick={ () => navigate("/checkout") }>Checkout</Button>
                }
            </div>    
        </>
        /*<div className="productList">
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
            {cartProducts.length > 0 &&
                <button onClick={ () => navigate("/checkout") }>Checkout</button>
            }
        </div>*/
     )
}