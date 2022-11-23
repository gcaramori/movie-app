import { useState } from 'react';
import { useForm } from "react-hook-form";

const Register = () => {
    // const [selectedFile, setSelectedFile] = useState();
	// const [isFilePicked, setIsFilePicked] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

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
            console.log(parsedData);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
      <div id="register" className="flex flex-col justify-center items-center w-full h-full font-main py-10">
        <h1 className="block text-3xl text-gray-300 mb-4 font-semibold">Quer virar um expert em filmes e séries?</h1>
        <h4 className="block text-xl text-gray-200 mb-8 opacity-90 font-medium">Cadastre-se no FilmeReviews e começe agora mesmo!</h4>
        <div id="registerForm" className="flex flex-col justify-center items-center base:h-full md:h-[90%] base:w-full md:w-[90%] lg:w-[750px] rounded-lg bg-darkGray p-10">
            <form className="flex flex-col justify-start items-center gap-1 h-[90%] w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="block mb-8 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                    <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Seu nome de usuário" {
                        ...register("username", {
                            required: true
                        })
                    } />
                    {
                        errors.username && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">Digite seu nome de usuário, por favor!</span>
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
                    <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Seu telefone" {
                        ...register("phone", {
                            required: true
                        })
                    } />
                    {
                        errors.phone && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">Digite seu telefone, por favor!</span>
                    }
                </div>
                <div className="block mb-8 xl:h-[4.5rem] base:w-[95%] md:w-[80%] relative">
                    <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Sua data de nascimento" {
                        ...register("birth", {
                            required: true,
                            pattern: {
                                value: /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/i
                            }
                        })
                    } />
                    {
                        errors.birth && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all absolute bottom-[-13px] left-0">Digite sua data de nascimento corretamente, por favor!</span>
                    }
                </div>
                <div className="flex justify-center items-center w-full">
                    <button type="submit" className="inline-block text-center text-md font-semibold py-3 px-20 bg-mainRed text-white rounded-lg drop-shadow-lg hover:bg-darkGray hover:text-white transition-all">Cadastrar</button>
                </div>
            </form>
        </div>
      </div>
    );
}

export default Register;