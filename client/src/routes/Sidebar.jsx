import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineUnorderedList, AiFillStar, AiFillEye, AiFillCompass } from 'react-icons/ai';
import { MdRateReview } from 'react-icons/md';
import { FaCog } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import { UserContext } from "../contexts/userContext";
import { deleteCookie } from "../utils/helper";
// import { CartContext } from "../../contexts/cart.context";

const Sidebar = () => {
    const { setCurrentUser } = useContext(UserContext);
    // const { isCartOpen } = useContext(CartContext);
    
    const handleExit = async () => {
        await fetch('http://localhost:8080/logout')
        .then(data => data.json())
        .then(parsedData => {
            if(parsedData)  {
                setCurrentUser(false);

                deleteCookie('jwtToken');
                deleteCookie('user');
            }
        })
    }
    return(
        <div id="sidebar" className="fixed top-0 left-0 h-full w-[15rem] py-20 font-main bg-darkGray">
            <div className="sidebarSection">
                <span className="block text-xs text-gray-400 ml-6 font-medium mb-4">MENU</span>
                <ul className="sidebarMenu flex flex-col justify-center items-start ml-6">
                    <li className="flex justify-start items-center mb-6 text-mainRed active relative w-full">
                        <AiFillHome size="1.5em" className="inline-block mr-4" />
                        <Link className="sidebar-link mr-4 active  transition-all font-semibold" to='/'>
                            Início
                        </Link>
                    </li>
                    <li className="flex justify-start items-center mb-6 text-mainRed relative"> 
                        <AiOutlineUnorderedList size="1.5em" className="inline-block mr-4" />
                        <Link className="sidebar-link mr-4  transition-all font-semibold" to='/discover'>
                            Minha lista
                        </Link>
                    </li>
                    <li className="flex justify-start items-center mb-6 text-mainRed relative">
                        <MdRateReview size="1.5em" className="inline-block mr-4" />
                        <Link className="sidebar-link mr-4  transition-all font-semibold" to='/new'>
                            Meus reviews
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="sidebarSection">
                <span className="block text-xs text-gray-400 ml-6 font-medium mb-4">BIBLIOTECA</span>
                <ul className="sidebarMenu flex flex-col justify-center items-start ml-6">
                    <li className="flex justify-start items-center mb-6 text-mainRed relative w-full">
                        <AiFillEye size="1.5em" className="inline-block mr-4" />
                        <Link className="sidebar-link mr-4 active  transition-all font-semibold" to='/'>
                            Vistos por último
                        </Link>
                    </li>
                    <li className="flex justify-start items-center mb-6 text-mainRed relative"> 
                        <AiFillStar size="1.5em" className="inline-block mr-4" />
                        <Link className="sidebar-link mr-4  transition-all font-semibold" to='/discover'>
                            Melhores avaliados
                        </Link>
                    </li>
                    <li className="flex justify-start items-center mb-6 text-mainRed relative">
                        <AiFillCompass size="1.5em" className="inline-block mr-4" />
                        <Link className="sidebar-link mr-4  transition-all font-semibold" to='/new'>
                            Descobrir
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="block mt-6">
                <ul className="sidebarMenu flex flex-col justify-center items-start ml-6">
                    <li className="flex justify-start items-center mb-6 text-mainRed relative w-full">
                        <FaCog size="1.5em" className="inline-block mr-4" />
                        <Link className="sidebar-link mr-4 active  transition-all font-semibold" to='/'>
                            Configurações
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="block absolute bottom-8 left-[1.5rem]">  
                <IoIosExit size="1.5em" className="inline-block mr-4 text-mainRed" />
                <Link className="sidebar-link mr-4  transition-all font-semibold" onClick={handleExit}>
                    Sair
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;