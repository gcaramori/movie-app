import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from 'react-router-dom';
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

        await fetch('http://localhost:8080/users', {
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
        <SuccessModal isOpen={isOpen} successMessage='Seu cadastro foi criado com sucesso!' title='Feito!' />
        <div id="register" className="flex flex-col justify-center items-center w-full h-full font-main py-10 relative">
            <Link to='/' className="absolute top-8 left-10 block h-20 w-20 text-white">
                <BiArrowBack size='2.5em'/>
            </Link>
            <h1 className="block text-3xl text-gray-300 mb-4 font-semibold">Quer se tornar um cinéfilo?</h1>
            <h4 className="block text-xl text-gray-200 mb-8 opacity-90 font-medium">Cadastre-se no FilmeReviews e começe agora mesmo!</h4>
            <div id="registerForm" className="flex flex-col justify-center items-center base:h-full md:h-[90%] base:w-full md:w-[90%] lg:w-[750px] rounded-lg bg-darkGray">
                <form className="flex flex-col justify-start items-center gap-1 h-[90%] w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="block mb-8 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                        <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Seu usuário" {
                            ...register("username", {
                                required: true
                            })
                        } />
                        {
                            errors.username && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">Digite seu usuário, por favor!</span>
                        }  
                    </div>
                    <div className="block mb-8 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                        <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Seu email" {
                            ...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                }
                            })
                        } />
                        {
                            errors.email && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">Digite o email corretamente, por favor!</span>
                        }  
                    </div>
                    <div className="block mb-8 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                        <input type="password" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Sua senha" {
                            ...register("password", {
                                required: true
                            })
                        } />
                        {   
                            errors.password && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">Digite sua senha, por favor!</span>
                        }
                    </div>
                    <div className="block mb-8 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                        <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Seu nome" {
                            ...register("name", {
                                required: true
                            })
                        } />
                        {
                            errors.name && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">Digite seu nome, por favor!</span>
                        }  
                    </div>
                    <div className="block mb-8 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Digite seu telefone, por favor!'
                                },
                                pattern: {
                                    value: /\(\d{2}\)\s\d{4,5}-?\d{4}/g,
                                    message: 'Digite seu telefone corretamente, por favor!'
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
                                        placeholder="Seu telefone"
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
                    <div className="block mb-8 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                        <Controller
                            name="birth"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Digite sua data de nascimento, por favor!'
                                },
                                pattern: {
                                    value: /^(\d{2})\/(\d{2})\/(\d{4})$/,
                                    message: 'Digite sua data de nascimento corretamente, por favor!'
                                }
                            }}
                            render={({ field }) => (
                                <MaskedInput
                                mask="99/99/9999"
                                maskChar=""
                                value={field.value}
                                onChange={field.onChange}
                                >
                                {(inputProps) => (
                                    <input
                                        {...inputProps}
                                        className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" 
                                        placeholder="Sua data de nascimento"
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
                        <button type="submit" className="inline-block text-center text-md font-semibold py-3 px-20 bg-mainRed text-white rounded-lg drop-shadow-lg hover:bg-darkGray hover:text-white transition-all">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
}

export default Register;