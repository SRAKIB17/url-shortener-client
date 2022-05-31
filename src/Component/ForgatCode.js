
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { toast } from 'react-toastify';


const ForgatCode = () => {
    const navigate = useNavigate();
    const [shortenerU, setShortenerU] = useState({ value: 'jlk57' })


    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        const { data: urlData } = await axios.post(`https://url-shortener-mini.herokuapp.com/find-url/${data.shortener}?email=${data.email}`, {});
        console.log(urlData)
        if (!urlData?.location) {
            toast.error('Not match');
        }
        else {
            navigate('/custom/' + urlData?.location)
        }
    }
    const httpHandle = () => {
        setShortenerU('')
    }
    return (
        <div>
            <Header />
            <form onKeyUp={httpHandle} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 items-center" >

                <div className=" w-full max-w-xs">
                    <p className="ml-0 text-secondary m-2 flex">Shortener: <p className="text-red-500 align-top"> *</p></p>
                    <p className="m-2">https://urlsh.yn.lt/ <span className="underline bg-primary text-white btn-xs btn">jlk57</span></p>
                    <input
                        value={shortenerU?.value}

                        placeholder="Enter url"
                        className="input input-bordered input-secondary  w-full max-w-xs"
                        {...register("shortener", { required: true })}
                    />
                </div>
                <div className=" w-full max-w-xs">
                    <p className="ml-0 text-secondary m-2 flex"> Email:  <p className="text-red-500 align-top"> * </p></p>
                    <input
                        placeholder="Email"
                        className="input input-bordered input-secondary  w-full max-w-xs"
                        {...register("email", { required: true })}
                    />
                </div>


                <input value='Find Code' type="submit" className="btn btn-success text-white w-full max-w-xs" />
            </form>
        </div>
    );
};



export default ForgatCode;