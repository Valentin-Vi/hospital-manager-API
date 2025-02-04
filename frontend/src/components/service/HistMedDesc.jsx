import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { servApi } from '../../util/fetch';

function HistMedDesc() {

    const { id } = useParams();
    const [ hist, setHist ] = useState(null);

    useEffect(() => {
        fetchData()
        .then(hist => setHist(hist));
    }, []);

    async function fetchData() {
        const res = await servApi('/hist/med/selectById', {
            method: 'POST',
            body: JSON.stringify({ hist_id: parseInt(id)}),
        });
        return res.ok ? await res.json() : null;
    };

    return (
        <>
            <p className='text-xs'>{ hist ? hist.description : null }</p>
        </>
    );
};

export default HistMedDesc;