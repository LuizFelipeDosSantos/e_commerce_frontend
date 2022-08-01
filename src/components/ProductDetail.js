/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { API_BASE_URL } from "../consts";
import Button from 'react-bootstrap/Button';

export function ProductDetail() {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [ product, setProduct] = useState([]);
    const [ quantity, setQuantity] = useState(1);
    const [ isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/user/wishlist/list`,  {params: {userId: user._id}});
                if (!data) return;
                const { wishlist } = data;
                setIsInWishlist(wishlist.some(wlProduct => wlProduct._id === location.state._id));
            } catch (error) {
                console.log(error.response.data.errorMessage);
            }
        }
        fetchWishlist();
        setProduct(location.state);
    }, []);

    async function addProductWishlist() {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/wishlist/add`, {product, userId: user._id});
            setIsInWishlist(true);
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.errorMessage);
        }
    }

    async function removeProductWishlist() {
        try {
            const response = await axios.delete(`${API_BASE_URL}/user/wishlist/remove`, {params: {productId: product._id, 
                                                                                                  userId: user._id}});
            setIsInWishlist(false);
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.errorMessage);
        }
    }

    async function addProductCart() {
        try {
            const response = await axios.post(`${API_BASE_URL}/shopping/cart/addProduct`,
                                               {userId: user._id,
                                                product,
                                                quantity,
                                                amount: Math.round((quantity * product.price) * 100) / 100});
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.errorMessage);
        }
    }

    function handleInput(event) {
        setQuantity(event.target.value);  
    }

    return ( 
        <div>
            {product &&
                <div>
                    <div className="productDetail">
                        <div>
                            <img src={product.imgUrl} alt="product img" width={200}/>
                        </div>
                        <div className="productDetailText">
                            <h3>{product.name}</h3>
                            <br/>
                            <h4>{product.description}</h4>
                            <br/>
                            <h4>Price: €{product.price}</h4>
                        </div>
                    </div>
                    <Button variant={ isInWishlist ? "danger" : "success"} onClick={ () => isInWishlist ? removeProductWishlist(product._id) 
                                                         : addProductWishlist(product) }>
                                    { isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</Button>
                    <br/>
                    <br/>
                    <Button onClick={ () => setQuantity(quantity - 1) }> - </Button>
                    <input
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={handleInput}
                    />
                    <Button onClick={ () => setQuantity(quantity + 1) }> + </Button>
                    <Button variant="success" onClick={ () => addProductCart() }> Add to Cart </Button>
                </div>
            }
        </div>
    )
}