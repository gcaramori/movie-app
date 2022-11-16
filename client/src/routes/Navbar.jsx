import { useContext } from "react";
import { Link } from "react-router-dom";
// import { UserContext } from "../../contexts/user.context";
// import { CartContext } from "../../contexts/cart.context";

const Navbar = () => {
    // const { currentUser } = useContext(UserContext);
    // const { isCartOpen } = useContext(CartContext);
    
    return(
        <div id="navbar" className="flex justify-start items-center w-full py-4 px-20">
            <Link className="nav-link mr-10" to='/'>
                Home
            </Link>
            <Link className="nav-link" to='/movies'>
                Movies
            </Link>
            <div className="nav-links-container">
                
            </div>
        </div>
    )
}

export default Navbar;