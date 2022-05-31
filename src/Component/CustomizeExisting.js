
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const CustomizeExisting = () => {

    const navigate = useNavigate();
    const [shortenerU, setShortenerU] = useState({ value: 'jlk57' })

    const { register, handleSubmit } = useForm();
    const onSubmit = async (urlData) => {

        const { data } = await axios.get(`https://url-shortener-mini.herokuapp.com/url-custom/${urlData?.shortener + "-" + urlData?.secretId}`)
        console.log(data)
        if (!data) {
            toast.error('Not match Shortener or Secret Id')
        }
        else {
            toast.success('Find')
            navigate(`/custom/${data?.editableId}`)

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

                        placeholder="Enter Shortener"
                        className="input input-bordered input-secondary  w-full max-w-xs"
                        {...register("shortener", { required: true })}
                    />
                </div>


                <div className=" w-full max-w-xs">
                    <p className="ml-0 text-secondary m-2 flex"> Secret code  <p className="text-red-500 align-top"> * </p></p>
                    <input
                        placeholder="Enter Secret Code"
                        className="input input-bordered input-secondary  w-full max-w-xs"
                        {...register("secretId", { required: true })}
                    />
                </div>

                <input type="submit" className="btn btn-success text-white w-full max-w-xs" />
                <Link to='/custom/forgat' className="btn-xs">Forgat Secret code</Link>
            </form>
        </div>
    );
};


export default CustomizeExisting;