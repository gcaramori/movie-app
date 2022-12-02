import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MaskedInput from "react-input-mask";
import SuccessModal from '../components/successModal';
import { BiArrowBack } from 'react-icons/bi';

const Register = () => {
    // const [selectedFile, setSelectedFile] = useState();
	// const [isFilePicked, setIsFilePicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    // const handleUpload = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     setIsFilePicked(true);
    // }

    const onSubmit = async (data) => {
        // const formData = new FormData();
        // formData.set('key', 'acc2ff62d076695cee95866d61dc1a55')
        // formData.append('image', selectedFile)
        
        // const uploadedProfilePic = await fetch('https://api.imgbb.com/1/upload', {
        //     method: 'POST',
        //     body: formData
        // }).then(data => data.json());

        // console.log(uploadedProfilePic);

        await fetch('http://filmereviews.vercel.app/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                birth: data.birth
            })
        })
        .then(data => data.json())
        .then(parsedData => {
            if(parsedData) setIsOpen(true);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
      <>
        <SuccessModal isOpen={isOpen} successMessage='Signup completed with success!' title='Done!' />

        <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
        >
            <div id="register" className="flex flex-col justify-center items-center w-full h-full font-main base:py-0 md:py-10 base:pt-14 md:pt-10 relative">
                <Link to='/' className="absolute base:top-1 md:top-8 base:left-4 md:left-10 block base:h-[3.8rem] md:h-20 base:w-14 md:w-20 text-white">
                    <BiArrowBack size='2.5em'/>
                </Link>
                <h1 className="block base:text-2xl md:text-3xl text-gray-300 mb-4 font-semibold text-center base:px-3 md:px-0">Wanna become a movie expert?</h1>
                <h4 className="block base:text-lg md:text-xl text-gray-200 base:mb-4 md:mb-8 opacity-90 font-medium text-center base:px-3 md:px-0">Signup at FilmeReviews and start right now!</h4>
                <div id="registerForm" className="flex flex-col justify-center items-center base:h-full md:h-[90%] base:w-full md:w-[90%] lg:w-[750px] rounded-lg bg-darkGray">
                    <form className="flex flex-col justify-start items-center gap-1 h-[90%] w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="block base:mb-6 md:mb-8 base:h-[3.8rem] lg:h-[4.3rem] base:w-[95%] md:w-[80%] relative">
                            <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Your username" {
                                ...register("username", {
                                    required: true
                                })
                            } />
                            {
                                errors.username && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">Please, type your username!</span>
                            }  
                        </div>
                        <div className="block base:mb-6 md:mb-8 base:h-[3.8rem] lg:h-[4.3rem] base:w-[95%] md:w-[80%] relative">
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
                                errors.email && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">{errors.email.message}</span>
                            }  
                        </div>
                        <div className="block base:mb-6 md:mb-8 base:h-[3.8rem] lg:h-[4.3rem] base:w-[95%] md:w-[80%] relative">
                            <input type="password" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Your password" {
                                ...register("password", {
                                    required: true
                                })
                            } />
                            {   
                                errors.password && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">Please, type your password!</span>
                            }
                        </div>
                        <div className="block base:mb-6 md:mb-8 base:h-[3.8rem] lg:h-[4.3rem] base:w-[95%] md:w-[80%] relative">
                            <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Your name" {
                                ...register("name", {
                                    required: true
                                })
                            } />
                            {
                                errors.name && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">Please, type your name!</span>
                            }  
                        </div>
                        <div className="block base:mb-6 md:mb-8 base:h-[3.8rem] lg:h-[4.3rem] base:w-[95%] md:w-[80%] relative">
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Please, type your phone!'
                                    },
                                    pattern: {
                                        value: /\(\d{2}\)\s\d{4,5}-?\d{4}/g,
                                        message: 'Please, type your phone correctly!'
                                    }
                                }}
                                render={({ field }) => (
                                    <MaskedInput
                                    mask="(99) 99999-9999"
                                    maskChar=""
                                    value={field.value}
                                    onChange={field.onChange}
                                    >
                                    {(inputProps) => (
                                        <input
                                            {...inputProps}
                                            className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all"
                                            placeholder="Your phone"
                                            type="text"
                                        />
                                    )}
                                    </MaskedInput>
                                    
                                )}
                            />
                            {
                                errors.phone && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">{errors.phone.message}</span>
                            }
                        </div>
                        <div className="block base:mb-6 md:mb-8 base:h-[3.8rem] lg:h-[4.3rem] base:w-[95%] md:w-[80%] relative">
                            <Controller
                                name="birth"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Please, type your birth date!'
                                    }
                                }}
                                render={({ field }) => (
                                    <MaskedInput
                                    mask="9999-99-99"
                                    maskChar=""
                                    value={field.value}
                                    onChange={field.onChange}
                                    >
                                    {(inputProps) => (
                                        <input
                                            {...inputProps}
                                            className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" 
                                            placeholder="Your birth date"
                                            type="text"
                                        />
                                    )}
                                    </MaskedInput>
                                    
                                )}
                            />
                            {
                                errors.birth && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">{errors.birth.message}</span>
                            }
                        </div>
                        <div className="flex justify-center items-center w-full">
                            <button type="submit" className="inline-block text-center text-md font-semibold py-3 px-20 bg-mainRed text-white rounded-lg drop-shadow-lg hover:bg-darkGray hover:text-white transition-all">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    </>
    );
}

export default Register;