/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProviderWrapper";
import { API_BASE_URL } from "../consts";

export function Wishlist() {
    const { user } = useContext(AuthContext);
    const [ wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        async function fetchWishlistProducts() {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/user/wishlist/list`,  {params: {userId: user._id}});
                if (!data) return;
                const { wishlist } = data;
                setWishlistProducts(wishlist);
            } catch (error) {
                console.log(error.response.data.errorMessage);
            }
        }
        fetchWishlistProducts();
    }, []);

    async function removeProductWishlist(productId) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/user/wishlist/remove`, {params: {productId, userId: user._id}});
            setWishlistProducts(wishlistProducts.filter((wlProduct) => wlProduct._id !== productId));
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.errorMessage);
        }
    }

    return ( 
        <div className="productList">
            <div>
                <h2>Wishlist</h2>
            </div>

            <ul>
                {wishlistProducts &&
                    wishlistProducts.map((product) => {
                        return (
                            <li key={product._id}>
                                <div>
                                    <Link to={"/product-detail"} state={ product }>
                                        <img src={product.imgUrl} alt="product img" width={100}/>
                                    </Link>
                                    <Link to={"/product-detail"}  state={ product }>
                                        <h4>{product.name}</h4>
                                    </Link>
                                    <h4>Price: €{product.price}</h4>
                                    <button onClick={ () => removeProductWishlist(product._id) }> Remove from Wishlist</button>
                                </div>
                            </li>
                        )
                    })}
            </ul>
        </div>
     )
}