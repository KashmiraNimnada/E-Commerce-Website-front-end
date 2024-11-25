import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import { useAuth } from "../context/AuthContext";
import NavBar from "./NavBar";

function Category() {

    const [categories,setCategories] = useState<CategoryType[]>([])
    const [categoryName,setCategoryName] = useState<string>("")

    const {isAuthenticated,jwtToken} = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }  
    }

    async function loadCategories() {
        const response = await axios.get("http://localhost:8081/categories",config)
        setCategories(response.data)
    }

    function handleCategoryName(event: any) {
        setCategoryName(event.target.value)
    }

    async function submitCategory() {
        const data = {
            name : categoryName
        }
        const response = await axios.post("http://localhost:8081/categories",data,config)
        console.log(response)
        loadCategories()
    }

    useEffect(function(){
        if(isAuthenticated) {
            loadCategories()
        }
        
    },[])

    return(
        <div className="mx-auto pb-5">
            <NavBar />
            <h1 className="text-3xl font-bold ml-5 mt-5 text-pink-900">Categories</h1>

            <div className="p-5 mt-5 ml-5">
            {categories && categories.map(function(category:CategoryType){
                return(
                    <div className="text-slate-600 border border-slate-200 mb-3 rounded-lg shadow me-2 p-3 inline-block">
                        {category.name}
                    </div>
                )
            })
            }
            </div>

            <h2 className="text-xl text-pink-900 font-medium mb-2 mt-5 ml-5">Create Category</h2>

            <div className="border border-slate-200 p-5 ml-5 rounded-lg shadow max-w-[350px]">
                <form>
                    <label className="text-slate-600 text-sm mb-2">Category Name </label>
                    <input type="text" className="mt-1 mb-4 text-slate-500 text-sm w-full p-1 border rounded-lg shadow border-slate-300" onChange={handleCategoryName} required />
                    <button type="button" className="bg-slate-800 border border-slate-800 text-white rounded-lg shadow p-2 hover:bg-slate-950 text-sm" onClick={submitCategory}>Create Category</button>
                </form>
            </div>

        </div>
    )
}

export default Category;