import axios from "axios"
import { useEffect, useState } from "react"
import ProductType from "../../types/ProductType"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import NavBar from "../NavBar"

function CreateOrder() {

    const [products,setProducts] = useState<ProductType[]>([])

    const {isAuthenticated,jwtToken} = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }  
    }

    async function loadProducts() {
        const response = await axios.get("http://localhost:8081/products",config)
        console.log(response)
        setProducts(response.data)
    }

    useEffect(function() {
        if(isAuthenticated) {
            loadProducts()
        }
    },[])

    const [totalPrice,setTotalPrice] = useState<number>(0)
    const [orderedProducts,setOrderedProducts] = useState<ProductType[]>([])

    function saveOrderedProducts(product: ProductType) {
        const updateProduct = [...orderedProducts,product]
        console.log(updateProduct)
        setOrderedProducts(updateProduct)
        const price = totalPrice + product.price
        console.log(price)
        setTotalPrice(price)     
    }


    function removeProduct(ind:number,product:ProductType) {
        const updatedProducts = orderedProducts.filter((_, i) => i !== ind)
        console.log(updatedProducts)
        setOrderedProducts(updatedProducts)
        const price = totalPrice - product.price
        console.log(price)
        setTotalPrice(price) 
    }

    // useEffect(function(){
    //     {orderedProducts.map(function(product:ProductType){
    //             const price = totalPrice + product.price
    //             setTotalPrice(price)     
    //     })}
    // },[orderedProducts])

    const navigate = useNavigate()

    async function submitOrder() {
        var productIDs: any = []
        orderedProducts.map(function(product){
            productIDs.push(product.id)
        })

        try {
            const response = await axios.post("http://localhost:8081/orders",{
                productIds : productIDs
            },config)
            console.log(response)
            navigate("/order")
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div className="bg-gradient-to-r from-white to-slate-100">
            <NavBar />
            <div className="flex">
            <div className="w-[500px] border-r">
                <h1 className="text-rose-800 italic tracking-widest underline underline-offset-2 antialiased text-5xl m-5 font-thin block h-[40px]">Products</h1>
                <div className="grid grid-cols-2">
                    {products && products.map(function(product){
                        return(
                            <button className="border shadow ... ring-2 ring-blue-500/50 mt-4 mx-3 mb-7 border-slate-200 rounded-xl pl-1 pt-1 pb-1 pr-3 bg-white grid grid-cols-2 hover:bg-orange-200 mb-2 w-[150px]" onClick={() => saveOrderedProducts(product)}>
                                <div className="text-lg text-red-600 font-semibold">{product.id}</div>
                                <div className="text-sm text-red-600 mb-1 font-normal bg-orange-200 p-2 rounded-2xl">{product.name}</div>
                                <div className="text-xs text-slate-700 font-semibold text-left">{product.category.name} category</div>
                                <div className="text-xs text-indigo-900 font-black text-right">Price : {product.price}</div>
                            </button>
                            // <div className="border border-slate-200 rounded-lg p-1 bg-orange-50 mb-2 w-[350px]">
                            //      <div className="text-sm text-red-600 font-semibold">Product id : {product.id}</div>
                            //     <div className="text-sm text-slate-800 font-semibold">Product name : {product.name}</div>
                            //     <div className="text-xs text-slate-500 font-semibold">Category : {product.category.name}</div>
                            //     <div className="text-xs text-indigo-900 font-semibold text-right">Price : {product.price}</div>
                            // </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className="ml-5 mr-5">
                <h2 className="text-rose-800 italic tracking-widest underline underline-offset-2 antialiased text-5xl ml-5 mr-5 mt-5 mb-10 font-thin block h-[40px]">New Order</h2>
                <table>
                    <thead className="border border-slate-500 shadow">
                        <tr>
                            <th className="border border-slate-200 shadow w-[150px] p-2 text-lg">Product ID</th>
                            <th className="border border-slate-200 shadow p-2 w-[400px] text-lg">Product Name</th>
                            <th className="border border-slate-200 shadow p-2 w-[200px] text-lg">Product Price</th>
                            <th className="border border-slate-200 shadow p-2 w-[200px] text-lg">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedProducts && orderedProducts.map(function(product,index:number){
                            return (
                                <tr>
                                    <td className="border border-slate-200 shadow py-3 text-center text-sm">{product.id}</td>
                                    <td className="border border-slate-200 shadow text-center text-sm">{product.name}</td>
                                    <td className="border border-slate-200 shadow text-center text-sm">{product.price}</td>
                                    <td className="text-center border border-slate-200 shadow">
                                        <button className="border bg-red-500 text-white hover:bg-red-700 shadow text-center text-sm py-1 px-3 rounded-2xl" onClick={() => removeProduct(index,product)}>Remove</button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan={2}  className ="border border-slate-200 shadow text-center text-lg text-pink-900">
                                <strong>Total : </strong>
                            </td>
                            <td className ="border border-slate-200 shadow text-center py-2 text-lg text-pink-900">
                                <strong>{totalPrice}</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="border text-black mt-10 p-3 rounded-3xl ... ring-2 ring-blue-500/50 hover:bg-blue-300" onClick={submitOrder}>Place Order</button>
            </div>
            </div>
        </div>

    )
}

export default CreateOrder