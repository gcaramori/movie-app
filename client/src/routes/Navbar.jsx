// import { useContext } from "react";
import { Link } from "react-router-dom";
// import { UserContext } from "../contexts/userContext";

const Navbar = () => {
    // const { currentUser } = useContext(UserContext);
    
    return (
        <div id="navbar" className="flex justify-start items-center w-full ml-[13rem] py-4 px-20 text-md font-main border-b border-b-gray-900">
            <Link className="nav-link mr-10 active drop-shadow-md transition-all font-semibold" to='/movies'>
                Filmes  
            </Link>
            <Link className="nav-link mr-10 drop-shadow-md transition-all font-semibold" to='/series'>
                Séries
            </Link>
            <Link className="nav-link drop-shadow-md transition-all font-semibold" to='/programs'>
                Programas de TV
            </Link>
            <div className="nav-links-container">
                
            </div>
        </div>
    )
}

export default Navbar;