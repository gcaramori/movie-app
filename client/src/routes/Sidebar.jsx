import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { AiFillHome, AiOutlineUnorderedList, AiFillCompass, AiOutlineClose } from 'react-icons/ai';
import { MdRateReview } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import { UserContext } from "../contexts/userContext";
import { RouteContext } from "../contexts/routeContext";
import { deleteCookie, setCookie } from "../utils/helper";

const Sidebar = ({ isMobile }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { setCurrentUser } = useContext(UserContext);
    const { currentRoute, setCurrentRoute } = useContext(RouteContext);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    useEffect(() => {
        setCookie('route', location.pathname);

        setCurrentRoute(location.pathname);
    }, [location, setCurrentRoute]);

    const handleExit = async () => {
        await fetch('http://localhost:8080/api/logout', {
            method: 'POST'
        })
        .then(data => data.json())
        .then(parsedData => {
            if(parsedData)  {
                setCurrentUser(false);
                setCurrentRoute(false);
                
                deleteCookie('jwtToken');
                deleteCookie('user');
                deleteCookie('route');

                navigate('/');
            }
        })
        .catch(err => console.log(err));
    }
    return(
        <>
            {
                isMobile && !isSidebarOpen ?
                <div id="toggleSidebar" className="fixed base:top-2 base:left-3 sm:left-6 h-10 w-10 text-white z-50 transition-all bg-darkGray rounded-full flex justify-center items-center" onClick={toggleSidebar}>
                    <FaBars size="1.3em" />
                </div> :
                ''
            }
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div id="sidebar" className={`fixed top-0 left-0 h-full w-[15rem] base:py-6 md:py-10 font-main bg-darkGray transition-all z-40 ${isMobile && !isSidebarOpen ? "translate-x-[-100%]" : ""}`}>
                    {
                        isMobile && isSidebarOpen ? 
                        <div id="toggleSidebar" className="absolute top-2 right-1 h-10 w-10 text-white z-50 transition-all bg-darkGray rounded-full flex justify-center items-center" onClick={toggleSidebar}>
                            <AiOutlineClose size="1.3em" />
                        </div> :
                        ''
                    }
                    <div className="sidebarSection">
                        <h1 className="base:text-xl text-2xl text-left text-gray-400 drop-shadow-md ml-6 base:mb-6 md:mb-10">FilmeReviews</h1>
                        <span className="block text-xs text-gray-400 ml-6 font-medium mb-4">MENU</span>
                        <ul className="sidebarMenu flex flex-col justify-center items-start ml-6">
                            <li isactive={currentRoute && (currentRoute === '/' || currentRoute === '/series' || currentRoute.indexOf('/movie/') > -1 || currentRoute.indexOf('/series/') > -1) ? 'active' : ''} className="flex justify-start items-center mb-6 text-mainRed relative w-full">
                                <AiFillHome size="1.5em" className="inline-block mr-4" />
                                <Link className="sidebar-link mr-4 active  transition-all font-semibold" to='/'>
                                    Home
                                </Link>
                            </li>
                            <li isactive={currentRoute === '/new' ? 'active' : ''} className="flex justify-start items-center mb-6 text-mainRed relative w-full">
                                <AiFillCompass size="1.5em" className="inline-block mr-4" />
                                <Link className="sidebar-link mr-4  transition-all font-semibold" to='/new'>
                                    Discover
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebarSection">
                        <span className="block text-xs text-gray-400 ml-6 font-medium mb-4">LIBRARY</span>
                        <ul className="sidebarMenu flex flex-col justify-center items-start ml-6">
                            <li isactive={currentRoute === '/my_list' ? 'active' : ''} className="flex justify-start items-center mb-6 text-mainRed relative w-full"> 
                                <AiOutlineUnorderedList size="1.5em" className="inline-block mr-4" />
                                <Link className="sidebar-link mr-4  transition-all font-semibold" to='/my_list'>
                                    My List
                                </Link>
                            </li>
                            <li isactive={currentRoute === '/my_reviews' ? 'active' : ''} className="flex justify-start items-center mb-6 text-mainRed relative w-full">
                                <MdRateReview size="1.5em" className="inline-block mr-4" />
                                <Link className="sidebar-link mr-4  transition-all font-semibold" to='/my_reviews'>
                                    My reviews
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="block mt-6">
                        <ul className="sidebarMenu flex flex-col justify-center items-start ml-6">
                            <li isactive={currentRoute === '/configs' ? 'active' : ''} className="flex justify-start items-center mb-6 text-mainRed relative w-full">
                                <FaCog size="1.5em" className="inline-block mr-4" />
                                <Link className="sidebar-link mr-4 active  transition-all font-semibold" to='/configs'>
                                    Configuration
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="block relative top-0 left-[1.5rem] mt-4">
                        <IoIosExit size="1.5em" className="inline-block mr-4 text-mainRed" />
                        <Link className="sidebar-link mr-4  transition-all font-semibold" onClick={handleExit}>
                            Logout
                        </Link>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Sidebar;