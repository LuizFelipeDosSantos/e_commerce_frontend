/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { API_BASE_URL } from "../consts";

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
                            <h3>Name: {product.name}</h3>
                            <h3>Description: {product.description}</h3>
                            <h3>Price: €{product.price}</h3>
                        </div>
                    </div>
                    <button onClick={ () => isInWishlist ? removeProductWishlist(product._id) 
                                                         : addProductWishlist(product) }>
                                    { isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</button>

                    <br/>
                    <button onClick={ () => setQuantity(quantity - 1) }> - </button>
                    <input 
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={handleInput}
                    />
                    <button onClick={ () => setQuantity(quantity + 1) }> + </button>
                    <button onClick={ () => addProductCart() }> Add to Cart </button>
                </div>
            }
        </div>
    )
}