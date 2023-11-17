import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import {config} from "../common/Constants";
import axios from "axios";
import "./BookingDetails.css";
import {Dimmer, Loader} from "semantic-ui-react";

function Booking() {
    const {bookingId} = useParams();
    const [ticketDetails, setTicketDetails] = useState([]);
    const [loading, setLoading] = useState(true);


    const instance = axios.create({
        baseURL: config.url.API_BASE_URL
    })

    function formatTime(timeString) {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const ampm = hours >= 12 ? ' PM' : ' AM';
        const formattedHours = hours % 12 || 12; // Handle 12:00 PM/AM

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes}${ampm}`;
    }


    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'short'});
        const year = date.getFullYear();
        return `${day}, ${month}, ${year}`;
    }

    useEffect(() => {
        console.log("bookingId " + bookingId)
        instance.get('/booking/details?booking_id=' + bookingId)
            .then((res) => {
                setTicketDetails(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                throw new Error(err);
            });
    }, []);

    return (
        <main>
            {loading ? (
                <Dimmer active>
                    <Loader>Loading...</Loader>
                </Dimmer>
            ) : (
                <div className="movie-details">
                    <div className="movie-image">
                        <img src={ticketDetails.qrimageUrl} alt={"QR Code"}/>
                    </div>
                    <div className="movie-info">
                        <h1>{"Booking Details"}</h1>
                        <p><strong>Movie:</strong> {ticketDetails.movieName}</p>
                        <p><strong>City:</strong> {ticketDetails.city}</p>
                        <p><strong>Theatre:</strong> {ticketDetails.theatre}</p>
                        <p><strong>Screen:</strong> {ticketDetails.screen}</p>
                        <p><strong>Amount:</strong> $ {ticketDetails.amount}</p>
                        <p><strong>Booking Email:</strong> {ticketDetails.email}</p>
                        <p><strong>Show Date:</strong> {formatDate(ticketDetails.showDate)}</p>
                        <p><strong>Time:</strong> {formatTime(ticketDetails.showTime)}</p>
                        <p><strong>Seats:</strong> {ticketDetails.seatData}</p>
                    </div>
                </div>
            )}
        </main>
    );

}

export default Booking;
