import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import SuccessModal from '../components/successModal';
import ErrorModal from '../components/errorModal';
import { BiArrowBack } from 'react-icons/bi';

const StepsModal = ({ activeStep, setStep, IsOpenSuccess, IsOpenError }) => {
    const [email, setEmail] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    switch(activeStep) {    
        case 2:
            const onSubmit = async (data) => {
                await fetch('http://localhost:8080/users', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({
                        email: email,
                        password: data.password
                    })
                })
                .then(data => data.json())
                .then(parsedData => {
                    if(parsedData) {
                        IsOpenSuccess(true);
                    }
                })
            }

            const handleBackButton = () => {
                reset();    
                setStep(1);
            }

            return (
                <form name="passwordChangeForm" className="flex flex-col base:justify-start md:justify-center items-center gap-1 h-[90%] w-full py-4 transition-all" onSubmit={handleSubmit(onSubmit)}>
                    <div className="block mb-8 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                        <input type="password" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Sua nova senha" name="password" {
                            ...register("password", {
                                required: {
                                    value: true,
                                    message: "Digite a sua nova senha, por favor!"
                                }
                            })
                        } />
                        {
                            errors.password && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-0 left-0">{errors.password.message}</span>
                        }  
                    </div>
                    <div className="flex justify-between items-center w-full base:w-[95%] md:w-[80%]">
                        <button type="button" className="inline-block text-center text-md font-semibold py-3 base:w-40 md:w-52 bg-gray-500 text-white rounded-lg drop-shadow-lg hover:bg-mainRed hover:text-white transition-all" onClick={handleBackButton}>Passo anterior</button>
                        <button type="submit" className="inline-block text-center text-md font-semibold py-3 base:w-40 md:w-52 bg-mainRed text-white rounded-lg drop-shadow-lg hover:bg-darkGray hover:text-white transition-all">Trocar senha</button>
                    </div>
                </form>
            );
        default: {
            const onSubmit = async (data) => {
                await fetch('http://localhost:8080/users/find', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({
                        filter: {
                            email: data.email,
                            username: data.username
                        }  
                    })
                })
                .then(data => data.json())
                .then(parsedData => {
                    if(parsedData[0] && parsedData[0].email && parsedData[0].username) {
                        setEmail(parsedData[0].email);
                        reset();
                        setStep(2);
                    }
                    else {
                        IsOpenError(true);
                    }
                });
            }

            return (
                <form name="confirmEmailForm" className="flex flex-col base:justify-start md:justify-center items-center gap-1 h-[90%] w-full py-4 transition-all" onSubmit={handleSubmit(onSubmit)}>
                    <div className="block mb-2 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                        <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 base:mb-6 md:mb-0 transition-all" placeholder="Seu email" name="email" {
                            ...register("email", {
                                required: {
                                    value: true,
                                    message: "Digite o email, por favor!"
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Digite o email corretamente, por favor!"
                                }
                            })
                        } />
                        {
                            errors.email && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-0 left-0">{errors.email.message}</span>
                        }  
                    </div>
                    <div className="block mb-2 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                        <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 base:mb-6 md:mb-0 transition-all" placeholder="Seu usuário" name="email" {
                            ...register("username", {
                                required: {
                                    value: true,
                                    message: "Digite o usuário, por favor!"
                                }
                            })
                        } />
                        {
                            errors.username && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-0 left-0">{errors.username.message}</span>
                        }  
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <button type="submit" className="inline-block text-center text-md font-semibold py-3 px-20 bg-mainRed text-white rounded-lg drop-shadow-lg hover:bg-darkGray hover:text-white transition-all">Próximo</button>
                    </div>
                </form>
            );
        }
    }
}

const PasswordRecovery = () => {
    const [isOpenSuccess, SetIsOpenSuccess] = useState(false);
    const [isOpenError, SetIsOpenError] = useState(false);
    const [step, setStep] = useState(1);
    // const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <SuccessModal isOpen={isOpenSuccess} successMessage='Sua senha foi alterada com sucesso!' title='Feito!' />
            <ErrorModal isOpen={isOpenError} setIsOpen={SetIsOpenError} errorMessage='O email e/ou usuário não foram encontrados em nossa base de dados!' title='Oops...' />

            <div id="passwordRecovery" className="flex flex-col justify-center items-center w-full h-full font-main base:py-0 md:py-10 base:pt-14 md:pt-10 relative">
                <Link to='/' className="absolute base:top-1 md:top-8 base:left-4 md:left-10 block h-20 w-20 text-white">
                    <BiArrowBack size='2.5em'/>
                </Link>
                <h1 className="block base:text-2xl md:text-3xl text-gray-300 mb-4 font-semibold">Esqueceu sua senha?</h1>
                <h4 className="block base:text-lg md:text-xl text-gray-200 mb-8 opacity-90 font-medium">Troque ela agora!</h4>
                <div id="passwordRecoveryForm" className="flex flex-col justify-center items-center base:h-full md:h-[40%] base:w-full md:w-[90%] lg:w-[750px] rounded-lg bg-darkGray">
                    <StepsModal activeStep={step} setStep={setStep} IsOpenSuccess={SetIsOpenSuccess} IsOpenError={SetIsOpenError} />
                </div>
            </div>
        </>
    );
}

export default PasswordRecovery;