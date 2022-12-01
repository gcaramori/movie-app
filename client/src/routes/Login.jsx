import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { UserContext } from "../contexts/userContext";
import ErrorModal from '../components/errorModal';

const Login = () => {
    const [openModal, setOpenModal] = useState(false);
    const { setCurrentUser } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data) => {
        await fetch('https://localhost:8080/api/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
                email: data.email,
                password: data.password
            })
        })
        .then(data => data.json())
        .then(parsedData => {
            if(parsedData.user && parsedData.token) {
                const token = parsedData.token;
                const user = parsedData.user;

                const tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
                document.cookie = `jwtToken=${token};expires=${tomorrow.toGMTString()}`;
                document.cookie = `user=${JSON.stringify(user)};expires=${tomorrow.toGMTString()}`;

                setCurrentUser({ user: user, token: token });
                return;
            }
            
            setOpenModal(true);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            <ErrorModal isOpen={openModal} setIsOpen={setOpenModal} title="Oops..." errorMessage="User and/or password is incorrect!" />
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
            >
                <div id="login" className="flex justify-center items-center w-full h-full font-main"> 
                    <div id="loginForm" className="flex flex-col justify-start items-center base:h-full md:h-[650px] base:w-full md:w-[550px] rounded-lg bg-darkGray p-10">
                        <div id="logo" className="block h-56 w-56 relative mx-auto overflow-hidden mb-6">
                            <img src="/logo.png" className="block w-full h-full relative object-contain" alt="logo" />
                        </div>
                        <h1 className="text-2xl text-gray-200 font-semibold mb-6 drop-shadow-lg">Signin</h1>
                        <form className="flex flex-col justify-start items-center gap-1 h-[90%] w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="block mb-8 base: base:h-16 lg:h-[4.2rem] base:w-[95%] md:w-[80%] relative">
                                <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Your email" {
                                    ...register("email", { 
                                        required: {
                                            value: true,
                                            message: "Please, type your email!"
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Please, type your email correctly!"
                                        }
                                    })
                                } />
                                {
                                    errors.email && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-0 left-0">{errors.email.message}</span>
                                }  
                            </div>
                            <div className="block mb-8 base:h-16 lg:h-[4.2rem] base:w-[95%] md:w-[80%] relative">
                                <input type="password" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Your password" {
                                    ...register("password", {
                                        required: {
                                            value: true,
                                            message: "Please, type your password!"
                                        }
                                    })
                                } />
                                {   
                                    errors.password && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-0 left-0">{errors.password.message}</span>
                                }
                            </div>
                            <div className="flex justify-between items-center base:w-[95%] md:w-[80%]">
                                <button type="submit" className="inline-block text-center base:text-sm sm:text-md font-semibold py-3 base:px-6 sm:px-10 bg-mainRed text-white rounded-lg drop-shadow-lg hover:bg-darkGray hover:text-white transition-all">Signin</button>
                                <Link className="inline-block text-center base:text-sm sm:text-md font-semibold py-3 base:px-6 sm:px-10 bg-gray-500 text-white rounded-lg drop-shadow-lg hover:bg-mainRed hover:text-white transition-all" to="/register">Signup</Link>
                            </div>
                        </form>
                        <Link className="block base:text-md md:text-sm text-gray-300 font-medium text-left relative top-4 base:w-[90%] md:w-[80%] mx-auto transition-all hover:text-gray-50" to="/password_recovery">Forgot your password? Click here to change.</Link>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Login;