import React, {useEffect, useState} from "react"
import {Navigate, useParams} from "react-router-dom";
import {config} from "../common/Constants";
import axios from "axios";
import {Dimmer, Loader} from "semantic-ui-react";

function CheckoutCallback() {
    const {bookingId, statusCode, showId} = useParams();
    const [redirectTo, setRedirectTo] = useState('/')
    const [loading, setLoading] = useState(true)

    const instance = axios.create({
        baseURL: config.url.API_BASE_URL
    })

    useEffect(() => {
        instance.post('/booking/status', {bookingId: bookingId, status: statusCode})
            .then((res) => {
                console.log(res.data);
                if (statusCode === 0 || statusCode === '0') {
                    const redirect = '/booking/' + bookingId + '/details'
                    setRedirectTo(redirect)
                } else if (statusCode === 1 || statusCode === '1') {
                    const redirect = '/movie-seat-layout/' + showId
                    setRedirectTo(redirect)
                }
                console.log("Params:", bookingId, statusCode, showId);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.error("Error fetching API:", err);
                throw new Error(err);
            });

    }, [bookingId, statusCode, showId]);

    return (
        <main>
            {loading ? (
                <Dimmer active>
                    <Loader>Processing the Order...</Loader>
                </Dimmer>
            ) : (<Navigate to={redirectTo}/>)}
        </main>);
}

export default CheckoutCallback;
