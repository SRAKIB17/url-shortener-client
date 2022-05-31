import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomizeUrl = ({ props: { edit, setEdit } }) => {

    const navigate = useNavigate()
    const [err, setErr] = useState('');
    const [errShortUrl, setErrShortUrl] = useState('')
    const [getUrlDetails, setUrlDetails] = useState({})
    useEffect(() => {
        setUrlDetails(edit)
    }, [edit, setEdit])

    const editableId = getUrlDetails?.editableId?.split('-')[1]
    const validURL = (e) => {
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
        const id = edit?._id;

        const { data: updateData } = await axios.put(`https://url-shortener-mini.herokuapp.com/update-url?id=${id}`, data);
        console.log(updateData)
        if (!updateData?.update) {
            setErrShortUrl(updateData?.message)
        }
        else {
            setErrShortUrl('')
        }

        if (updateData?.result?.modifiedCount) {
            navigate(`/custom/${updateData?.location}`);
            setEdit(null)
            toast.success('successfully update')
        }
    }

    const changeValueHandle = () => {
        setUrlDetails('')
    }
    return (
        <div>



            <input type="checkbox" id="editUrlModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div>
                        <label onClick={() => setEdit(null)} for="editUrlModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                        <form onKeyUp={changeValueHandle} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 items-center" >
                            <h1 className='text-center text-secondary text-xl'>Customize Url</h1>
                            <div className=" w-full max-w-xs">
                                <p className="ml-0 text-secondary m-2 flex">Enter url <p className="text-red-500 align-top"> *</p></p>
                                <input
                                    onKeyUp={validURL}
                                    value={getUrlDetails?.url}
                                    placeholder="Enter url"
                                    className="input input-bordered input-secondary  w-full max-w-xs"
                                    {...register("url", { required: true })}
                                />
                            </div>
                            <div className="content-start w-full max-w-xs">
                                {err}
                            </div>

                            <div className=" w-full max-w-xs">
                                <p className="ml-0 text-secondary m-2 flex">Shortener:  <p className="text-green-500 align-top">  (length 5-6)</p></p>
                                <input
                                    value={getUrlDetails?.url_short_form}
                                    placeholder="Shortener"
                                    className="input input-bordered input-secondary  w-full max-w-xs"
                                    {...register("url_short_form")}
                                />
                            </div>
                            <div className="content-start w-full max-w-xs">
                                <p className='text-red-500'>{errShortUrl}</p>
                            </div>

                            <div className=" w-full max-w-xs">
                                <p className="ml-0 text-secondary m-2 flex">Secret code  <p className="text-green-500 align-top">  (optional length 6-10)</p></p>
                                <input
                                    placeholder="Enter Secret Code"
                                    value={editableId}
                                    className="input input-bordered input-secondary  w-full max-w-xs"
                                    {...register("editableId", { min: 6, max: 10 })}
                                />
                            </div>

                            <div className=" w-full max-w-xs">
                                <p className="ml-0 text-secondary m-2 flex">Email:  <p className="text-green-500 align-top">  (optional for backup and customize)</p></p>
                                <input
                                    type='email'
                                    value={getUrlDetails?.email}
                                    placeholder="Email"
                                    className="input input-bordered input-secondary  w-full max-w-xs"
                                    {...register("email")}
                                />
                            </div>


                            <input type="submit" disabled={err === 'done' ? false : true} value="Update" className="btn btn-success text-white w-full max-w-xs" />

                        </form>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default CustomizeUrl;