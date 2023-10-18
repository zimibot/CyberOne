import { Link } from "react-router-dom"
import { Maps } from "../../components/maps/maps"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState } from "react"
import { apiUrl } from "../../api/path"
import Swal from "sweetalert2"
import Logo from '../../assets/images/navbar_logo.png'

const Register = () => {
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            if (data.password !== data.repassword) {
                setError("repassword", { message: "Password not match" })
            }
            let regis = await axios.post(`${apiUrl}/register`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })

            setLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'REGISTER SUCCESS',
                text: regis.data.message,
            })
            reset()
        } catch (error) {
            setLoading(false)
            let name = error.response.data.name
            let msg = error.response.data.message
            if (name) {
                setError(name, { message: msg })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: msg,
                })
            }
        }
    }


    return <div className="dark:bg-dark-500 bg-light-400 bg-world-light dark:bg-world-dark bg-center bg-cover bg-no-repeat w-full min-h-screen grid grid-cols-1 md:grid-cols-6 items-center justify-center font-rajdhani px-4 py-20 sm:py-0">
        <Maps />
        <div className="container z-50 relative col-span-3 h-full flex items-center justify-center">
            <div className="flex gap-4 items-center">
                <h1 className="text-center dark:text-white text-4xl mb-10 md:mb-0 md:text-6xl font-bold">
                    Signup
                </h1>
                <h1 className="text-center dark:text-white text-4xl mb-10 md:mb-0 md:text-6xl font-bold">
                    |
                </h1>
                <img className="w-[350px]" src={Logo}></img>
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative z-50 col-span-6 md:col-span-3 flex justify-center h-full items-start dark:bg-dark-500">


            <div
                className="flex relative flex-col gap-y-4 m-auto w-full md:max-w-md shadow-xl bg-white md:bg-white/80 dark:bg-white/10 dark:md:bg-white/10 dark:text-white p-6 rounded-md">
                {loading && <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-white bg-opacity-50">
                    <div>
                        LOADING
                    </div>
                </div>}
                <div className="flex flex-col gap-4">
                    <label for="fname">
                        Fullname *
                        <input {...register("fullname", { required: true })} className=" bg-gray-200  dark:bg-white/10 dark:md:bg-white/10 px-3 py-2 text-lg placeholder:text-lg w-full block rounded-sm focus:outline-none" type="text" id="fname" placeholder="Enter your full name" />
                        <input {...register("roles", { value: "user" })} className="hidden" type="text" id="fname" placeholder="Enter your full name" />
                        {errors?.username && <p className="text-error_primary text-sm italic">Username is required</p>}

                    </label>
                    <label for="username">
                        Username *
                        <input {...register("username", { required: "Username is required" })} className=" bg-gray-200  dark:bg-white/10 dark:md:bg-white/10 px-3 py-2 text-lg placeholder:text-lg w-full block rounded-sm focus:outline-none" type="text" id="username" placeholder="Enter your username" />
                        {errors?.username && <p className="text-error_primary text-sm italic">{errors.username.message}</p>}
                    </label>

                </div>
                <label for="email">
                    Email *
                    <input {...register("email", { required: "Email is required", })} className=" bg-gray-200  dark:bg-white/10 dark:md:bg-white/10 px-3 py-2 text-lg placeholder:text-lg w-full block rounded-sm focus:outline-none" type="text" id="email" placeholder="Enter your email address" />
                    {errors?.email && <p className="text-error_primary text-sm italic">{errors.email.message}</p>}
                </label>

                <label for="password">
                    Password *
                    <input {...register("password", { required: true })} className=" bg-gray-200  dark:bg-white/10 dark:md:bg-white/10 px-3 py-2 text-lg placeholder:text-lg w-full block rounded-sm focus:outline-none" type="password" id="password" placeholder="Enter your password" />
                    {errors?.password && <p className="text-error_primary text-sm italic">Password is required</p>}
                </label>

                <label for="repassword">
                    Re-password *
                    <input {...register("repassword", { required: "Re-password is required" })} className=" bg-gray-200  dark:bg-white/10 dark:md:bg-white/10 px-3 py-2 text-lg placeholder:text-lg w-full block rounded-sm focus:outline-none" type="password" id="repassword" placeholder="Re-enter your password" />
                    {errors?.repassword && <p className="text-error_primary text-sm italic">{errors.repassword.message}</p>}
                </label>

                <div className="grid grid-cols-2 gap-4">
                    <Link className="block  w-full  mt-2 px-4 py-2 text-center text-white hover:bg-blue-900 bg-blue-950 ring-1 ring-blue-950 duration-300 transition-colors text-lg font-semibold tracking-wider rounded-sm" to={"/"}>LOGIN</Link>
                    <button type="submit"
                        className="block  mt-2 px-4 py-2 w-full text-white hover:bg-gray-900 bg-gray-950 ring-1 ring-gray-950 duration-300 transition-colors text-lg font-semibold tracking-wider rounded-sm">Signup</button>
                </div>
            </div>
        </form>
    </div>
}

export default Register