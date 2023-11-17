import React, {useEffect, useState} from 'react';
import {Grid, Label, Loader, Segment} from 'semantic-ui-react';
import {useNavigate, useParams} from "react-router-dom";
import './MovieSeatLayout.css';
import {Modal} from 'react-responsive-modal';
import {useAuth} from '../auth/AuthContext'
import axios from 'axios';

const MovieSeatLayout = () => {
    const [openModal, setOpenModal] = useState(false);
    const {showId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const {getUser} = useAuth()

    const getEmail = () => {
        const user = getUser()
        return user ? user.data.email : null
    }


    const [seats, setSeats] = useState(Array.from({length: 12}, (_, i) => {
        return Array.from({length: 15}, (_, j) => {
            return {
                id: j,
                isAvailable: true,
                isBlocked: false,
                isSelected: false,
                rate: 0,
                seatId: -1,
                row: '',
                column: -1
            };
        });
    }));

    const convertNumberToLetter = (num) => {
        const number = parseInt(num, 10);
        if (number >= 0 && number <= 25) {
            return String.fromCharCode(65 + number);
        } else {
            return 'Invalid number';
        }
    };

    useEffect(() => {

        fetch('http://localhost:8080/search/seats?show_id=' + showId)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {

                const updatedSeats = [...seats];

                for (let i = 0; i < json.length; i++) {
                    const item = json[i];
                    const rowNumber = parseInt(item.rowNumber, 10);
                    const columnNumber = parseInt(item.columnNumber, 10);

                    if (
                        rowNumber >= 0 &&
                        rowNumber < updatedSeats.length &&
                        columnNumber >= 0 &&
                        columnNumber < updatedSeats[rowNumber].length
                    ) {
                        updatedSeats[rowNumber][columnNumber].isAvailable = item.available;
                        updatedSeats[rowNumber][columnNumber].isBlocked = !item.available || item.blocked;
                        updatedSeats[rowNumber][columnNumber].rate = item.rate;
                        updatedSeats[rowNumber][columnNumber].seatId = item.id;
                        updatedSeats[rowNumber][columnNumber].row = convertNumberToLetter(item.rowNumber);
                        updatedSeats[rowNumber][columnNumber].column = columnNumber + 1;
                    }
                }

                setSeats(updatedSeats);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);


    const onClickButton = (e) => {
        e.preventDefault();
        setOpenModal(true);
    }

    const onCloseModal = () => {
        setOpenModal(false);
    }

    const [totalCost, setTotalCost] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const handleCancelClick = () => {
        setOpenModal(false);
    };

    const confirmSeats = async () => {
        const user = getUser();

        if (!user) {
            navigate('/login');
            return;
        }
        const requestData = {
            amount: totalCost,
            seatIds: selectedSeats.map(seat => seat.seatId),
            email: getEmail(),
            seatData: selectedSeats.map(seat => seat.row + seat.column).join(', ')
        };

        try {
            const response = await axios.post('http://localhost:8080/booking/initiate', requestData);
            console.log('API Response:', response?.data?.checkoutUri);

            const checkoutUri = response?.data?.checkoutUri;
            if (checkoutUri) {
                console.log('Checkout URL found in the response: ' + checkoutUri);

                window.location.href = checkoutUri; // Redirect to external URL
            } else {
                console.error('Checkout URL not found in the response.');
            }
        } catch (error) {
            console.error('Error while initiating booking:', error);
        }
    };


    const handleSeatClick = (rowIndex, seatIndex) => {

        const updatedSeats = seats.map(row => row.map(seat => ({...seat})));

        if (updatedSeats[rowIndex][seatIndex].isBlocked) {
            return
        }
        updatedSeats[rowIndex][seatIndex].isAvailable = !updatedSeats[rowIndex][seatIndex].isAvailable;
        updatedSeats[rowIndex][seatIndex].isSelected = !updatedSeats[rowIndex][seatIndex].isSelected;


        const newlySelectedSeats = updatedSeats
            .flat()
            .filter(seat => seat.isSelected);

        var newTotalCost = 0;

        for (let i = 0; i < newlySelectedSeats.length; i++) {
            newTotalCost = newTotalCost + newlySelectedSeats[i].rate;
        }

        setSeats(updatedSeats);
        setSelectedSeats(newlySelectedSeats);
        setTotalCost(newTotalCost);

    };

    let cinemaRows = [];

    for (let i = 0; i < 9; i++) {
        let seatComponents = [];

        for (let j = 0; j < 15; j++) {
            var seatClass = seats[i][j].isAvailable ? 'available' : 'selected';
            if (seats[i][j].isBlocked) {
                seatClass = 'blocked';
            }
            seatComponents.push(
                <div
                    className={`seat ${seatClass}`}
                    key={j}
                    onClick={seatClass !== 'blocked' ? () => handleSeatClick(i, j) : null}
                >
                    <span className="tooltip">{`Rate: $${seats[i][j].rate}`}</span>

                    {j + 1}
                </div>
            );
        }

        cinemaRows.push(
            <div className="cinema-row" key={i}>
                <Label className="row-label">{String.fromCharCode(65 + i)}</Label>
                {seatComponents}
            </div>
        );
    }

    let cinemaRows2 = [];

    for (let i = 0; i < 3; i++) {
        let seatComponents = [];

        for (let j = 0; j < 15; j++) {
            var seatClass = seats[9 + i][j].isAvailable ? 'available' : 'selected';
            if (seats[9 + i][j].isBlocked) {
                seatClass = 'blocked';
            }
            seatComponents.push(
                <div
                    className={`seat ${seatClass}`}
                    key={j}
                    onClick={seatClass !== 'blocked' ? () => handleSeatClick(9 + i, j) : null}
                >
                    <span className="tooltip">{`Rate: $${seats[9 + i][j].rate}`}</span>
                    {j + 1}
                </div>
            );
        }

        cinemaRows2.push(
            <div className="cinema-row" key={10 + i}>
                <Label className="row-label">{String.fromCharCode(65 + 9 + i)}</Label>
                {seatComponents}
            </div>
        );
    }


    return (
        <main>  {isLoading ? (
                <Loader active inline="centered"/>
            ) :
            <div>
                {openModal && (
                    <Modal open={openModal} class="react-responsive-modal-closeButton">
                        <div className="booking-popup">
                            <h1>Booking Summary</h1>
                            <ul>
                                {
                                    (() => {
                                        let seatItems = [];
                                        console.log(selectedSeats);
                                        for (let i = 0; i < selectedSeats.length; i++) {
                                            let seat = selectedSeats[i];
                                            seatItems.push(<li key={seat.id}> Seat {seat.row}{seat.column} :
                                                ${seat.rate}</li>);
                                        }

                                        return seatItems;
                                    })()
                                }
                            </ul>
                            <p>Total Cost: ${totalCost}</p>
                            <div className="booking-buttons">
                                <button className="ui button" onClick={handleCancelClick}>Cancel</button>
                                <button className="ui button primary" onClick={confirmSeats}>Checkout</button>
                            </div>
                        </div>
                    </Modal>
                )}
                <div className="seatsContainer">
                    <Grid className="theatre">
                        <Segment className="cinema-seats">
                            {cinemaRows}
                            <div className="walkway"/>
                            {cinemaRows2}
                        </Segment>
                    </Grid>
                </div>
                <div className='bookingBtnContainer'>
                    <button class="ui button" className='bookingBtn' onClick={onClickButton}>Book Now</button>
                </div>
            </div>}
        </main>
    );
};

export default MovieSeatLayout;
