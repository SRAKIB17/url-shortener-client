import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const GotoUrl = () => {
    const { getShortId } = useParams()
    console.log(getShortId)
    const { data, isLoading, refetch } = useQuery(getShortId, () => axios.get(`https://url-shortener-mini.herokuapp.com/url/${getShortId}`))
    const getUrl = data?.data;

    if (isLoading) {
        return (
            <div className='text-center text-2xl m-4 animate-ping'>
                redirect
            </div>
        )
    }
    if (getUrl) {
        window.location.href = getUrl
    }
    else {
        return (
            <div>
                <h1 className='text-center animate-ping'>Cannot GET /{getShortId}</h1>
            </div>
        )
    }

};

export default GotoUrl;