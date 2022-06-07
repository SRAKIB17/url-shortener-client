import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import './common.css'
import edit from '../svg/edit.svg';
import copy from '../svg/copy.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import CustomizeUrl from './CustomizeUrl';
import Header from './Header';
import QRCode from "react-qr-code";


const Customize = () => {

    const navigate = useNavigate()
    const { getEditAbleId } = useParams();
    const [download, setDownload] = useState(true)
    const [state, setState] = useState({ copied: false });
    const [edit, setEdit] = useState(null)
    const { data, isLoading, refetch } = useQuery(getEditAbleId, () => axios.get(`https://url-shortener-mini.herokuapp.com/url-custom/${getEditAbleId}`))
    const { email, url, editableId, url_short_form } = data?.data || {};
    if (!data?.data) {
        navigate('/')
    }
    if (state.copied) {
        toast.success('Copied');
        setState({ copied: false })
    }
    const secretCode = editableId?.split('-')[1]
    const shortener = editableId?.split('-')[0]

    const [urlw, setUrl] = useState("")
    const downloadQr = async (e) => {
        setDownload(true)
        const svg = e.target.ownerDocument.querySelector('#svg');
        var svgData = new XMLSerializer().serializeToString(svg);
        const canvas = e.target.ownerDocument.querySelector('#myCanvas');

        const svgSize = svg.getBoundingClientRect();
        //Resize can break shadows

        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        canvas.style.width = svgSize.width;
        canvas.style.height = svgSize.height;
        var ctx = canvas.getContext("2d");

        const img = e.target.ownerDocument.createElement('img')

        await img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData))));

        await ctx.drawImage(img, 1, 1);

        const file = canvas.toDataURL('image/png', 1.0);

        const a = e.target.ownerDocument.createElement('a');

        a.className = "display-none";
        a.download = `${shortener}.png`;
        a.href = file;
        e.target.appendChild(a);

        if (download) {
            a.click();
            setDownload(false)
        }
    }
    const domainUrl = 'urlsh.hexat.com/'
    return (
        <div>
            <Header />

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse h-full">
                    {/* for url details  */}
                    <div>
                        <div className='mx-auto'>

                            <table className="table mx-auto">
                                <caption><h1 className='m-2 text-2xl text-secondary underline'>Url Details</h1></caption>
                                <caption className='bg-info text-white p-3 rounded-lg'>
                                    Please get secretId and remember it for edit or update url/ Shortener url next time
                                </caption>
                                <tbody>
                                    <tr className='hover input'>

                                        <td>
                                            Email:
                                        </td>
                                        <td>
                                            {email ? email : 'Please add email for backup'}
                                        </td>
                                        <td>

                                        </td>
                                    </tr>

                                    <tr className='hover input'>
                                        <td>
                                            Secret Link:
                                        </td>
                                        <td>
                                            <p className=' overflow-x-auto input input-bordered input-secondary w-[210px] flex items-center justify-between' id='shortFormUrl '>
                                                <span className='flex'>
                                                    <p title='Shortener'>{shortener}</p><p title='separator'>-</p><p title='Secret Code'>{secretCode}</p>
                                                </span>
                                                <CopyToClipboard text={editableId} onCopy={() => setState({ copied: true })}>
                                                    <button className='btn-xs btn-secondary rounded-md'>
                                                        <img src={copy} alt="" />
                                                    </button>
                                                </CopyToClipboard>
                                            </p>
                                            <p>
                                                Format: <span className='text-gray-500 underline'>"Shortener-SecretCode"</span>
                                            </p>
                                        </td>
                                        <td>

                                        </td>
                                    </tr>

                                    <tr className='hover input'>
                                        <td>Url:</td>
                                        <td>
                                            <p className='w-full overflow-x-auto input input-bordered input-secondary w-[210px] flex items-center justify-between'>
                                                {url}
                                            </p>
                                        </td>
                                        <td>

                                        </td>
                                    </tr>

                                    <tr className='hover input'>
                                        <td>Shortener url:</td>
                                        <td>
                                            <p className='overflow-x-auto input input-bordered input-secondary w-[210px] flex items-center justify-between' id=' '>
                                                <span id='shortFormUrl'>
                                                    {domainUrl + url_short_form}
                                                </span>
                                                <CopyToClipboard text={domainUrl + url_short_form} onCopy={() => setState({ copied: true })}>
                                                    <button className='btn-xs btn-secondary rounded-md'>
                                                        <img src={copy} alt="" />
                                                    </button>
                                                </CopyToClipboard>

                                            </p>
                                        </td>
                                        <td>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='3'>
                                            <div className='flex items-center justify-center'>
                                                {/* <img src="https://www.w3schools.com/graphics/pic_the_scream.jpg" alt="" /> */}
                                                <QRCode
                                                    id='svg'
                                                    size='200'
                                                    
                                                    value={domainUrl + url_short_form}
                                                    viewBox={`0 0 256 256`}
                                                />

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='3'>
                                            <button onClick={downloadQr} className='btn btn-secondary btn-xs text-white'>Download QR Code</button>
                                        </td>
                                    </tr>


                                    <tr className=' input '>
                                        <td colSpan='3'>
                                            <div className='flex justify-center items-center gap-1 w-full'>
                                                <button onClick={() => navigate('/')} className='btn btn-xs btn-secondary'>
                                                    Back
                                                </button>
                                                <label onClick={() => setEdit(data?.data)} for="editUrlModal" className='btn btn-xs btn-secondary ml-2 flex justify-center items-center gap-1'>
                                                    Customize Url
                                                    <img src={edit} alt="" />
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <iframe className='h-full' src={url} frameborder="0" title='view'>

                            </iframe>

                            <canvas id="myCanvas" width="240" height="297"
                                style={{ display: 'none', padding: '10px', border: '1px solid #d3d3d3' }}>
                                Your browser does not support the HTML5 canvas tag.
                            </canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    edit && <CustomizeUrl props={{ edit, setEdit }} />
                }
            </div>
        </div>
    );
};

export default Customize;