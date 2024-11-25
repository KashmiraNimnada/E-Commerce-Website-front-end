import { useEffect, useState } from "react";
import LinkType from "../types/LinkType";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function NavBar() {

    const { logout } = useAuth();

    const [linkSet,setLinkSet] = useState<LinkType[]>([]);
    const [nav,setNav] = useState<boolean>(false);

    const links = [
        {
            link: 'profile',
        },
        {
            link: 'product',
        },
        {
            link: 'category',
        },
        {
            link: 'order',
        }
    ]

    useEffect(function(){
        setLinkSet(links);
    },[])

    function shouldLogout() {
        logout()
    }

    return (
        <div className="h-20 w-full flex justify-between bg-blue-400 text-white py-5">
            <div>
                <h1 className="text-5xl font-signature ml-2">Idea Phone Hub</h1>
            </div>
            <ul className="hidden md:flex">
                {linkSet && linkSet.map(function(link_set:LinkType){
                    return(
                        <li className="text-xl px-4 capitalize mr-5 hover:scale-110 duration-300">
                            <Link to={`/${link_set.link}`}>{link_set.link}</Link>
                        </li>
                    )
                })}
                <li className="text-xl px-4 capitalize mr-5 hover:scale-110 duration-300" onClick={() => shouldLogout()}>Logout</li>
            </ul>
            <div className="md:hidden pr-4 z-10 cursor-pointer" onClick={() => setNav(!nav)}>
                {nav ? <FaTimes size={30}/> : <FaBars size={30}/>}
            </div>
            {nav && (
                <ul className="h-screen w-full absolute flex flex-col bg-gradient-to-b from-blue-400 to bg-cyan-400 top-0 left-0 justify-center items-center">
                {linkSet && linkSet.map(function(link_set:LinkType){
                    return(
                        <li className="text-4xl capitalize px-4 cursor-pointer py-6">
                            <Link to={`/${link_set.link}`}>{link_set.link}</Link>
                        </li>
                    )
                })}
            </ul>
            )}
                
        </div>
    )
}

export default NavBar;