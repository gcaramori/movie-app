import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        await fetch('http://localhost:8080/users', {
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
            <form className="flex flex-col justify-start items-center gap-6 h-[90%] w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="block mb-8 base:w-[95%] md:w-[80%]">
                    <input type="text" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Seu email" {
                        ...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            }
                        })
                    } />
                    {
                        errors.email && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all">Digite o email corretamente, por favor!</span>
                    }  
                </div>
                <div className="block mb-8 base:w-[95%] md:w-[80%]">
                    <input type="password" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Sua senha" {
                        ...register("password", {
                            required: true
                        })
                    } />
                    {   
                        errors.password && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all">Digite sua senha, por favor!</span>
                    }
                </div>
                <div className="flex justify-between items-center base:w-[95%] md:w-[80%]">
                    <button type="submit" className="inline-block text-center text-md font-semibold py-3 px-10 bg-mainRed text-white rounded-lg drop-shadow-lg hover:bg-darkGray hover:text-white transition-all">Login</button>
                </div>
            </form>
        </div>
      </div>
    );
}

export default Register;