import { useEffect, useState } from "react"
import ProductType from "../types/ProductType"
import axios from "axios"
import CategoryType from "../types/CategoryType"
import { useAuth } from "../context/AuthContext"
import NavBar from "./NavBar"

function Product() {

    const {isAuthenticated,jwtToken} = useAuth();

    const [products,setProducts] = useState<ProductType[]>([])
    const [categories,setCategories] = useState<CategoryType[]>([])

    // states required to create a product
    const [productName,setProductName] = useState<string>("")
    const [productPrice,setProductPrice] = useState<number>(0)
    const [productDescription,setProductDescription] = useState<string>("")
    const [productCategoryID,setCategoryID] = useState<number>(0)

    const [productId,setProductId] = useState<number>()

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }  
    }

    async function loadProducts() {
        console.log(config);
        const response = await axios.get("http://localhost:8081/products",config)
        console.log(response)
        setProducts(response.data)
    }

    async function loadCategories() {
        console.log(config);
        const response = await axios.get("http://localhost:8081/categories",config)
        setCategories(response.data)
    }

    useEffect(function() {
        console.log(isAuthenticated+"asda");
        if(isAuthenticated){
            console.log(isAuthenticated);
            loadProducts();
            loadCategories();
        }
    },[isAuthenticated])

    function handleProductName(event: any) {
        setProductName(event.target.value)
    }

    function handleProductPrice(event: any) {
        setProductPrice(event.target.value)
    }

    function handleProductDescription(event: any) {
        setProductDescription(event.target.value)
    }

    function handleCategoryID(event: any) {
        setCategoryID(event.target.value)
    }

    const [relevantProduct,setRelevantProduct] = useState<ProductType | null>(null) 

    function editPreviousProduct(product: ProductType) {
        setRelevantProduct(product)
        setProductId(product.id)
        setProductName(product.name)
        setProductPrice(product.price)
        setProductDescription(product.description)
        setCategoryID(product.category.id)
    }

    async function deleteProduct(id: number) {
        try {
            const response = await axios.delete(`http://localhost:8081/products/${id}`,config)
            console.log(response)
            loadProducts()
        } catch (error: any) {
            console.log(error)
        }
    }

    async function handleUpdateProduct() {
        const data_2 = {
            "name" : productName,
            "price" : productPrice,
            "description" : productDescription,
            "categoryId" : productCategoryID
        }

        try {
            const response = await axios.put(`http://localhost:8081/products/${productId}`,data_2,config)
            console.log(response)
            loadProducts()
            setProductName("")
            setProductPrice(0)
            setProductDescription("")
            setCategoryID(0)
            setRelevantProduct(null)
        } catch (error: any) {
            console.log(error)
        }
        

    }

    async function handleSubmitProduct() {
        const data = {
            name : productName,
            price : productPrice,
            description : productDescription,
            categoryId : productCategoryID
        }

        try {
            await axios.post("http://localhost:8081/products",data,config)
            loadProducts()
            setProductName("")
            setProductPrice(0)
            setProductDescription("")
            setCategoryID(0)
            
        } catch (error: any) {
            console.log(error)
        }

    }
    return (
        <div className="mx-auto">
            <NavBar />
            <h1 className="text-3xl font-bold text-pink-900 mt-5 ml-5">Products</h1>

            <table className="table-width mb-5 mt-5 ml-5">
                <thead className="border bg-slate-200">
                    <tr>
                        <th className="p-2 text-sm border border-slate-400">Product ID</th>
                        <th className="p-2 text-sm border border-slate-400">Product Name</th>
                        <th className="p-2 text-sm border border-slate-400">Product Price</th>
                        <th className="p-2 text-sm border border-slate-400 w-[100px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(function(product:ProductType){
                        return (
                            <tr>
                                <td className="p-2 text-sm border border-slate-400">{product.id}</td>
                                <td className="p-2 text-sm border border-slate-400">{product.name}</td>
                                <td className="p-2 text-sm border border-slate-400">{product.price}</td>
                                <td className="pt-2 pb-2 pl-4 text-sm border w-[170px] border-slate-400">
                                    <button type="button" className="border bg-blue-400 hover:bg-blue-500 p-1 text-white h-[40px] w-[70px] rounded-3xl mr-2" onClick={() => editPreviousProduct(product)}>Edit</button>
                                    <button type="button" className="border bg-red-400 hover:bg-red-500 p-1 text-white h-[40px] w-[70px] rounded-3xl" onClick={() => deleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>

            <div className="mt-14 w-[550px] pt-10 pb-4 pl-5 border bg-slate-200 shadow ml-5">
                <form className="">
                        <div className="grid grid-cols-2 grid-rows-1 mb-5 w-1/2">
                            <label className="pl-5 font-sans">Product Name</label>
                            <input type="text" className="font-sans border shadow border-slate-400 rounded-lg w-[300px] text-sm p-2 ml-5" onChange={handleProductName} value={productName} required/>
                        </div>
                        <div className="grid grid-cols-2 grid-rows-1 mb-5 w-1/2">
                            <label className="pl-5 font-sans">Product Price</label>
                            <input type="text" className="font-sans border shadow border-slate-400 rounded-lg w-[300px] text-sm p-2 ml-5" onChange={handleProductPrice} value={productPrice} required/>
                        </div>
                        <div className="grid grid-cols-2 grid-rows-1 mb-5 w-1/2">
                            <label className="pl-5 font-sans">Description</label>
                            <input type="text" className="font-sans border shadow border-slate-400 rounded-lg w-[300px] text-sm p-2 ml-5" onChange={handleProductDescription} value={productDescription} required/>
                        </div>
                        <div className="grid grid-cols-2 grid-rows-1 mb-5 w-1/2">
                            <label className="pl-5 font-sans">Category ID</label>
                            <select className="font-sans border border-slate-400 shadow rounded-lg w-[300px] text-slate-500 text-sm p-2 ml-5" onChange={handleCategoryID} value={productCategoryID} required>
                                <option value="">Please select category</option>
                                {categories.map(function(category:CategoryType){
                                    return (
                                        <option value={category.id}>{category.name}</option>
                                    )
                                })
                                }
                            </select>
                        </div>

                        {relevantProduct ? (
                            <button type="button" className="border p-2 border-slate-900 mb-1 bg-slate-700 text-white rounded-2xl hover:bg-slate-950 text-sm shadow" onClick={handleUpdateProduct}>Update Product</button>
                        ) : (
                            <button type="button" className="border p-2 border-slate-900 mb-1 bg-slate-700 text-white rounded-2xl hover:bg-slate-950 text-sm shadow" onClick={handleSubmitProduct}>Create Product</button>
                        )}
        
                        
                </form>
            </div>

        </div>
    )
}

export default Product