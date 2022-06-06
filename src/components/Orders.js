/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProviderWrapper";
import { API_BASE_URL } from "../consts";
import { Link } from "react-router-dom";

export function Orders() {
    const [ orderList, setOrderList] = useState([]);
    const [ orderIdShowItems, setOrderIdShowItems ] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/shopping/order/list`, {params: {userId: user._id}});
                if (!data) return;
                const { orders } = data;
                setOrderList(orders);
            } catch (error) {
                console.log(error.response.data.errorMessage);
            }
        }
        fetchOrders();
    }, []);

    return ( 
        <div className="addressList">
            <div>
                <h2>Orders</h2>
            </div>

            <ul>
                {orderList &&
                    orderList.map((order) => {
                        return (
                            <li key={order._id}>
                                <div>
                                    <h4>Date: {order.createdAt}</h4>
                                    <h4>Status: {order.status}</h4>
                                    <h4>Amount: €{order.amount}</h4>
                                    {orderIdShowItems === order._id
                                    ?   <div>
                                            {order.items.map((item) => {
                                                return (
                                                    <li key={item.product._id}>
                                                        <div>
                                                            <Link to={"/product-detail"} state={ item.product }>
                                                                <img src={item.product.imgUrl} alt="product img" width={100}/>
                                                            </Link>
                                                            <Link to={"/product-detail"}  state={ item.product }>
                                                                <h4>{item.product.name}</h4>
                                                            </Link>
                                                            <h4>Quantity: {item.quantity}</h4>
                                                            <h4>Amount: €{item.product.price * item.quantity}</h4>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                            <button onClick={() => setOrderIdShowItems('')}> Close Items </button>    
                                        </div>
                                    :   <button onClick={() => setOrderIdShowItems(order._id)}> Show Items </button>}
                                </div>
                            </li>
                        )
                    })
                    }
            </ul>
        </div>
     )
}