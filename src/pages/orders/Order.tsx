import { useEffect, useState } from "react"
import OrderType from "../../types/OrderType"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Order() {

    const [orders,setOrders] = useState<OrderType[]>([])

    async function loadOrders() {
        try {
            const response = await axios.get("http://localhost:8081/orders")
            console.log(response)
            setOrders(response.data)   
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(function (){
        loadOrders()
    },[])

    const navigate = useNavigate()

    return (
        <div className="container mx-auto py-5">
            <h1 className="font-semibold text-3xl text-pink-900 mb-8">Orders</h1>

            <Link to="/order/create" className="border bg-teal-100 p-2 rounded-3xl hover:bg-teal-200 mb-5">Create Order</Link>

            <table className="mt-10">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="border border-black py-1 pl-3 pr-3 text-sm font-serif">Order ID</th>
                        <th className="border border-black py-1 pl-3 pr-3 text-sm font-serif"> Order date and time</th>
                        <th className="border border-black py-1 pl-3 pr-3 text-sm font-serif">Total amount</th>
                        <th className="border border-black py-1 pl-3 pr-3 text-sm font-serif">Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {orders && orders.map(function(order:OrderType){
                            return (
                                <tr>
                                    <td className="border border-black py-1 pl-10 pr-3 text-sm">{order.id}</td>
                                    <td className="border border-black py-1 pl-3 pr-3 text-sm">{order.orderDateTime}</td>
                                    <td className="border border-black py-1 pl-10 pr-3 text-sm">{order.totalPrice}</td>
                                    <td className="text-center border border-black p-2 text-sm">
                                        <button className="border px-2 bg-blue-500 rounded-2xl hover:bg-blue-700 shadow text-white" onClick={() => {
                                            navigate(`/order/${order.id}/editOrder`)
                                        }}>Edit</button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                        
                </tbody>
            </table>
        </div>
    )
}

export default Order