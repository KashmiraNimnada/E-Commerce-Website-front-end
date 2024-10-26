import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import OrderType from "../../types/OrderType"
import ProductType from "../../types/ProductType"

function EditOrder() {

    const {id} = useParams()
    const [order,setOrder] = useState<OrderType>()
    const [products,setProducts] = useState<ProductType[]>([])

    useEffect(() => {
            axios.get(`http://localhost:8081/orders/${id}`)
                .then(function(response){
                    console.log(response)
                    setOrder(response.data)
                }).catch(function(error){
                    console.log(error)
                })
            axios.get("http://localhost:8081/products")
                .then(function(response){
                    console.log(response)
                    setProducts(response.data)
                }).catch(function(error){
                    console.log(error)
                })

    },[])

    const navigate = useNavigate()

    return (
    <div className="flex bg-gradient-to-r from-white to-slate-50 "> 
        <div className="col-lg-8">
            <h1 className="text-3xl font-black text-pink-900 ml-5 pl-5 mb-5 mt-5">Add products to order #{id}</h1>
                {order &&
                    <div>
                        <div className="flex gap-x-96 ">
                            <div className="mr-10 ml-10 text-slate-400 text-sm">Ordered Date and Time : {order.orderDateTime}</div>
                        </div>
                        <div>
                            <table className="ml-40 mt-10">
                                <thead className="bg-slate-200">
                                    <tr>
                                        <th className="border border-spacing-x-3 text-2xl font-black border-slate-400 ... w-[100px] px-2">#</th>
                                        <th className="border border-slate-400 ... w-[300px] px-2">Product Name</th>
                                        <th className="border border-slate-400 ... w-[200px] px-2">Product Price</th>
                                        <th className="border border-slate-400 ... w-[200px] px-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderedProducts.map((product) => {
                                        return (
                                            <tr className="bg-slate-50">
                                                <td className="border border-slate-400 ... px-2 text-center">{product.id}</td>
                                                <td className="border border-slate-400 ... px-2 text-sm text-center">{product.name}</td>
                                                <td className="border border-slate-400 ... px-2 text-sm text-center">{product.price}</td>
                                                <td className="border border-slate-400 ... px-2 text-sm text-center py-1">
                                                    <button className="px-2 py-1 border bg-red-600 hover:bg-red-800 rounded-3xl text-white text-xs" onClick={() => {
                                                        axios.delete(`http://localhost:8081/orders/${id}/product/${product.id}`)
                                                            .then(function(response){
                                                                console.log(response)
                                                                setOrder(response.data)
                                                            })
                                                    }}>Remove</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                            <div className="text-right">
                                <button className="mt-5 border bg-blue-400 hover:bg-blue-600 py-2 px-3 text-xl rounded-3xl text-white" onClick={() =>{
                                    navigate("/order")
                                }}>Submit</button>
                            </div>
                             
                        </div>
                    </div>        
                }
        </div>
        <div className="col-lg-4 ml-8 border-l">
            {order &&
                <div className="ml-5 pl-5 mb-5 mt-5 text-right text-amber-900 font-black text-2xl">Total Price : Rs . {order.totalPrice}</div>
            }
            <div>
                {products && products.map(function(product){
                    return (
                        <div className="mb-3 border w-[200px] ml-10 pl-2 pt-1 pb-2 bg-white rounded-xl shadow">
                            <div className="p-1 font-bold text-pink-900">{product.name}</div>
                            <div className="p-1 font-extrabold">Rs .{product.price}</div>
                            <div className="text-right mr-1">
                                <button className="border py-1 px-2 shadow bg-blue-200 rounded-lg hover:bg-blue-300 hover:cursor-pointer" onClick={() => {
                                    const data = {
                                        productId : product.id,
                                        qty : 1
                                    }
                                    axios.post(`http://localhost:8081/orders/${id}/addProduct`,data)
                                        .then(function(response){
                                            console.log(response)
                                            setOrder(response.data)
                                        }).catch(function(error){
                                            console.log(error)
                                        })
                                }}>Add</button>
                            </div>
                        </div>
                    )
                })
                }               
            </div>
            
        </div>

    </div>
        
    )
}

export default EditOrder