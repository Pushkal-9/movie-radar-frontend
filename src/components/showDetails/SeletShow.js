import React from "react"
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { config } from "../common/Constants";
import axios from "axios";
import { Tab, Grid, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./SelectShow.css";

function SelectShow() {
    const { cityId, movieId } = useParams();
    const [items, setItems] = useState([]);
    const [DataisLoaded, setDataIsLoaded] = useState(false);
    const [movie, setMovie] = useState([]);
    const navigate = useNavigate();


    const instance = axios.create({
        baseURL: config.url.API_BASE_URL
    })

    if (!(movieId && cityId)) {
        //ERROR
    }


    const groupData = (data) => {
        const groupedItems = {};
    
        data.forEach((show) => {
            const updatedMovie = show.movie;
            setMovie(updatedMovie)
            const key = `${show.theatre.name}-${show.date}`;
    
            if (!groupedItems[key]) {
                groupedItems[key] = {
                    theatre: show.theatre.name,
                    date: show.date,
                    shows: {},
                };
            }
    
            if (!groupedItems[key].shows[show.screen.name]) {
                groupedItems[key].shows[show.screen.name] = [];
            }
    
            const showInfo = {
                showId: show.id,
                startTime: show.startTime,
            };
    
            groupedItems[key].shows[show.screen.name].push(showInfo);
        });
    
        setItems(Object.values(groupedItems));
        console.log(JSON.stringify(groupedItems));
    };
    

    const navigateToSeatSelection = (showId) => {
        navigate(`/movie-seat-layout/${showId}`);
        };



    useEffect(() => {
        var formdata = new FormData();
        console.log("cityId " + cityId)
        console.log("movieId " + movieId)
        instance.post('/search/show', { cityId: cityId, movieId: movieId })
            .then((res) => {
                groupData(res.data);
                setDataIsLoaded(true);
            })
            .catch(err => {
                throw new Error(err);
            });
    }, []);

    function formatTime(timeString) {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Handle 12:00 PM/AM

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes}${ampm}`;
    }


    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });

        return `${day} ${month}`;
    }

    return (
        <main>
            <div className="movie-details">
                <div className="movie-image">
                    <img src={movie.imageLink} alt={movie.name} />
                </div>
                <div className="movie-info">
                    <h1>{movie.name}</h1>
                    <p><strong>Language:</strong> {movie.language}</p>
                    <p><strong>Rating:</strong> {movie.rating}</p>
                    <p><strong>Description:</strong> {movie.description}</p>
                    <p><strong>Duration:</strong> {movie.duration}</p>
                    <p><strong>Country:</strong> {movie.country}</p>
                    <p><strong>Genre:</strong> {movie.genre}</p>
                    <p><strong>Release Date:</strong> {formatDate(movie.releaseDate)}</p>
                </div>
            </div>
            <div>
                <Tab
                    menu={{ fluid: true, horizontal: true, tabular: true }}
                    panes={items.map((item, index) => ({
                        menuItem: formatDate(item.date),
                        render: () => (
                            <Grid columns={3} stackable>
                                {Object.entries(item.shows).map(([screen, timings]) => (
                                    <Grid.Column key={screen}>
                                        <div className="ui raised segment">
                                            <div className="theatre">
                                                <h3>{item.theatre}</h3>
                                            </div>
                                            <div className="screen">
                                                <h4>Screen : {screen}</h4>
                                            </div>
                                            <div className="timings">
                                                {timings.map((time, i) => (
                                                    <Button
                                                        key={i}
                                                        primary
                                                        className="timingButton"
                                                        onClick={() => navigateToSeatSelection(time.showId)}
                                                    >
                                                        {formatTime(time.startTime)}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </Grid.Column>
                                ))}
                            </Grid>
                        ),
                    }))}
                />
            </div>
        </main>
    );
};





export default SelectShow;
