
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Add = () => {
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const [http, setHttp] = useState({ value: 'http://' })
    function validURL(e) {
        const str = e.target.value;
        const pattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?', 'i'); // fragment locator
        const check = pattern.test(str)
        if (check) {
            setErr('done')
        }
        else {
            setErr(<p className="text-red-500 text-xs text-left"> Please provide correct url</p>)
        }
    }
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        const { data: urlData } = await axios.post('https://url-shortener-mini.herokuapp.com/set-url', data);
        console.log(urlData)
        if (urlData?.data?.acknowledged) {
            navigate(`/custom/${urlData?.editableId}`)
        }
    }
    const httpHandle = () => {
        setHttp('')
    }
    return (
        <div>
            <Header/>
            <form onKeyUp={httpHandle} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 items-center" >

                <div className=" w-full max-w-xs">
                    <p className="ml-0 text-secondary m-2 flex">Enter url <p className="text-red-500 align-top"> *</p></p>
                    <input
                        value={http?.value}
                        onKeyUp={validURL}
                        placeholder="Enter url"
                        className="input input-bordered input-secondary  w-full max-w-xs"
                        {...register("url", { required: true })}
                    />
                </div>
                <div className="content-start w-full max-w-xs">
                    {err}
                </div>
                <div className=" w-full max-w-xs">
                    <p className="ml-0 text-secondary m-2 flex"> Secret code  <p className="text-green-500 align-top">  (optional)</p></p>
                    <input
                        placeholder="Enter Secret Code"
                        className="input input-bordered input-secondary  w-full max-w-xs"
                        {...register("secretId")}
                    />
                </div>

                <div className=" w-full max-w-xs">
                    <p className="ml-0 text-secondary m-2 flex"> Email:  <p className="text-green-500 align-top">  (optional for backup and customize)</p></p>
                    <input
                        placeholder="Email"
                        className="input input-bordered input-secondary  w-full max-w-xs"
                        {...register("email")}
                    />
                </div>


                <input disabled={err === 'done' ? false : true} type="submit" className="btn btn-success text-white w-full max-w-xs" />
            </form>
        </div>
    );
};

export default Add;