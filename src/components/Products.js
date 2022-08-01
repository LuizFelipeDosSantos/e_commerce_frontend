import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../consts";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

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
        <>  
            <div className="productList">
                <br/>     
                <h2>Products</h2>
                <br/>
                <br/>
                <Row xs={1} md={3} className="g-4">
                    {productList &&
                        productList.map((product) => {
                            return (
                                <Col>
                                    <Card key={product._id} bg="warning" className="productCard">
                                        <Card.Img variant="top" src={product.imgUrl}/>
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>Price: €{product.price}</Card.Text>
                                        </Card.Body>
                                        <Link to={"/product-detail"} state={ product } class="stretched-link"></Link>
                                    </Card>
                                </Col>
                            )
                        })}
                </Row>
            </div>    
        </>
        )

        /*<div className="productList">
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
    )*/
}