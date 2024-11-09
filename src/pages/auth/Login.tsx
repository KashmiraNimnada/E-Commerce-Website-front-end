import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

    const { login } = useAuth();
    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const [error,setError] = useState<string>("");
    const navigate = useNavigate();

    async function submit(event: any) {
        event.preventDefault();

        if(username=="" || password==""){
            setError("Username and password are required");
        }

        const data = {
            username: username,
            password: password
        }

        try {
            const response = await axios.post("http://localhost:8081/auth/login",data);
            login(response.data);
            navigate("/");
        } catch (error) {
            setError("There was an error loggin in");
        }
        
    }

    return (
        <div className="h-screen w-full items-center p-36 justify-center bg-gradient-to-b from bg-gray-100 to-white">
            <div className="max-w-[500px] mx-auto px-10 pb-10 pt-2 bg-white rounded-lg shadow-lg">
                <div>
                    <h1 className="text-center text-4xl pt-2 pb-8 font-normal text-neutral-700">Login</h1>
                </div>
                <form onSubmit={submit}>
                    <div className="flex flex-col pl-2">
                        <label className="mb-2">Username</label>
                        <input type="text" onChange={function(event) {
                            setUsername(event.target.value);
                            setError("");
                        }} placeholder="Enter your username" className="border w-72 mb-2 py-2 px-4 rounded-md"/>
                    </div>
                    <div className="flex flex-col pl-2">
                        <label className="mb-2">Password</label>
                        <input type="password" onChange={function(event){
                            setPassword(event.target.value);
                            setError("");
                        }} placeholder="Enter your password" className="border w-72 mb-8 py-2 px-4 rounded-md"/>
                    </div>

                    {error && 
                        <div className="text-red-500 text-sm pb-5">
                            {error}
                        </div>
                    }

                    <div>
                        <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full p-2 rounded-md text-white text-lg hover:scale-x-105 duration-300">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;