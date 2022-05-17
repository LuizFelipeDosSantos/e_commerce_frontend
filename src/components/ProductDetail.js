/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function ProductDetail() {
    const location = useLocation();
    const [ product, setProduct] = useState([]);

    useEffect(() => {
        setProduct(location.state);
    }, []);

    return ( 
        <div>
            {product &&
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
            }
        </div>
    )
}