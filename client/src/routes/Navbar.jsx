import { useContext, useEffect } from "react";
import { motion } from 'framer-motion';
import { Link, useLocation } from "react-router-dom";
import { RouteContext } from "../contexts/routeContext";
import { setCookie } from "../utils/helper";

const Navbar = () => {
    const { currentRoute, setCurrentRoute } = useContext(RouteContext);
    const location = useLocation();

    useEffect(() => {
        setCookie('route', location.pathname);

        setCurrentRoute(location.pathname);
    }, [location, setCurrentRoute]);
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div id="navbar" className="flex justify-start items-center w-full ml-[13rem] py-4 px-20 text-md font-main border-b border-b-gray-900">
                <Link isactive={currentRoute === '/' ? 'active' : ''} className="nav-link mr-10 active drop-shadow-md transition-all font-semibold" to='/'>
                    Movies  
                </Link>
                <Link isactive={currentRoute === '/series' ? 'active' : ''} className="nav-link mr-10 drop-shadow-md transition-all font-semibold" to='/series'>
                    Series and TV Shows
                </Link>
                <div className="nav-links-container">
                    
                </div>
            </div>
        </motion.div>
    )
}

export default Navbar;