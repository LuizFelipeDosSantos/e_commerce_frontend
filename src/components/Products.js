import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../consts";

export function Products() {
    const [ productList, setProductList] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/product/list`);
                if (!data) return;
                const { products } = data;
                setProductList(products);
            } catch (error) {
                console.log(error.response.data.errorMessage);
            }
        }
        fetchProducts();
    }, []);

    return ( 
        <div className="productList">
            <div>
                <h2>Products</h2>
            </div>

            <ul>
                {productList &&
                    productList.map((product) => {
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
                                </div>
                            </li>
                        )
                    })}
            </ul>
        </div>
     )
}