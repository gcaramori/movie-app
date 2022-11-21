import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = ({ setToken }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data.email);
        
        await fetch('http://localhost:8080/signin', {
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
                setToken(parsedData.token);
            }
            else {

            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
      <div id="login" className="flex justify-center items-center w-full h-full font-main">
        <div id="loginForm" className="flex flex-col justify-start items-center h-[80%] w-[550px] rounded-lg bg-darkGray p-10">
            <div id="logo" className="block h-56 w-56 relative mx-auto overflow-hidden mb-6">
                <img src="/logo.png" className="block w-full h-full relative object-contain" alt="logo" />
            </div>
            <h1 className="text-2xl text-gray-200 font-semibold mb-6 drop-shadow-lg">Login</h1>
            <form className="flex flex-col justify-start items-center gap-6 h-full w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="block mb-8 w-[80%]">
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
                <div className="block mb-8 w-[80%]">
                    <input type="password" className="block h-10 w-full bg-gray-800 border-2 border-mainRed rounded-full text-sm font-semibold text-white px-4 transition-all" placeholder="Sua senha" {
                        ...register("password", { 
                            required: true
                        })
                    } />
                    {   
                        errors.password && <span className="block mt-1 pl-3 text-sm text-white opacity-80 transition-all">Digite sua senha, por favor!</span>
                    }
                </div>     
                <div className="flex justify-between items-center w-[80%]">      
                    <button type="submit" className="inline-block text-center text-md font-semibold py-3 px-10 bg-mainRed text-white rounded-lg drop-shadow-lg hover:bg-darkGray hover:text-white transition-all">Login</button>
                    <Link className="inline-block text-center text-md font-semibold py-3 px-10 bg-gray-500 text-white rounded-lg drop-shadow-lg hover:bg-mainRed hover:text-white transition-all" to="/register">Cadastre-se</Link> 
                </div>
            </form>
        </div>
      </div>
    );
}

export default Login;