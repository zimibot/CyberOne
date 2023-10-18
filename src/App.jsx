import React, { useContext, useState } from 'react';
import Shield from './assets/images/icon/shield.svg';
import { Maps } from './components/maps/maps.jsx';
import { Input } from './components/input.jsx';
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { apiUrl } from './api/path';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Logo from './assets/images/navbar_logo.png'
import MyContext from './helpers/contex';

function App() {
  let navigate = useNavigate()

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1150px)'
  })

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const { configSettings } = useContext(MyContext)
  const onSubmit = (data) => {
    setLoading(true)

    let login = axios.post(`${apiUrl}/login`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    login.then(d => {
      localStorage.setItem("token", d.data.token)
      configSettings.setConfig(a => ({ ...a, token: d.data.token }))
      navigate("/user/assets-list/", { replace: true })
    }).catch(d => {
      let msg = d.response.data.message
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    })
  }

  return (
    <div className=" w-screen h-screen flex flex-col relative text-backround_secondary dark:!text-white">

      <div className="absolute overflow-hidden w-full h-full flex items-center justify-center z-0">
        <Maps></Maps>
        <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-20 z-30" />
      </div>
      <div className="flex flex-1 items-center justify-center relative">
        <div className="text-center w-full max-w-[450px] flex flex-col gap-5">
          <div className="flex justify-center flex-col items-center gap-5">
            {/* <h1 className="text-center text-[50px] font-bold dark:!text-white">CYBER ONE</h1> */}
            <img className="w-[350px]" src={Logo}></img>
            <div className="text-xl">AUTHENTICATION PROTOCOL</div>
          </div>
          <form className="space-y-4 text-left" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input register={register("username", { required: "Username is required" })} placeholder={"Username"} label={'USERNAME IDENTIFICATION'} />
              {errors?.username && <p className="text-error_primary text-sm italic">{errors.username.message}</p>}
            </div>
            <div>
              <Input register={register("password", { required: "Password is required" })} type={"password"} placeholder={"Password"} label={'PASSWORD'} />
              {errors?.password && <p className="text-error_primary text-sm italic">{errors.password.message}</p>}
            </div>
            <div className="flex justify-end">
              <Link className="py-2 px-4 bg-border_primary" to="/register">REGISTER</Link>
            </div>
            <button disabled={loading} className="p-2 w-full border  hover:bg-white hover:bg-opacity-10 text-backround_secondary dark:!!text-white dark:!!bg-transparent border-backround_primary" >
              {loading ? "LOADING" : "CONTINUE"}

            </button>
          </form>
        </div>
      </div>
      {isDesktopOrLaptop &&
        <div className="px-6 py-6 flex w-full dark:!text-opacity-40 text-[#262626]  dark:!text-white text-xs gap-8 items-center relative">
          <div className="grid grid-cols-9 gap-2 w-[480px] ">
            <img width={60} src={Shield}></img>
            <div className="col-span-8 ">
              USED ONLY BY AUTHORIZED AND RELATED ARAY PARTIES. USE THROUGHOUT PROVISIONS AND ABOVE REASONABLE LIMIT WILL BE ACTIONED AS A SECURITY THREAT AND CYBER CRIME MAY BE PROCESSED BY STATE LAW OF THE REPUBLIC OF INDONESIA
            </div>
          </div>
          <div className="flex-1 flex gap-8">
            <div>
              <div className="font-bold">
                CONTACT ADMINISTRATOR
              </div>
              <span>TECHNICAL@cyberone.MA</span>
            </div>
            <div>
              <div className="font-bold">
                SECURED BY
              </div>
              <span>PT CYBERONE</span>
            </div>
            <div>
              <div className="font-bold">
                COPYRIGHT
              </div>
              <span>2023
              </span>
            </div>
            <div>
              <div className="font-bold">
                YOUR LOCATION
              </div>
              <span>INDONESIA
              </span>
            </div>
            <div>
              <div className="font-bold">
                VERSION
              </div>
              <span>ALPHA 1.0.0
              </span>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
