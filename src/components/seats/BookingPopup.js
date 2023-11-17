import React from 'react';
import Modal from 'react-responsive-modal';

const BookingPopup = ({selectedSeats, totalCost, onClose}) => {
    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="booking-popup">
                <h1>Booking Summary</h1>
                <ul>
                    {selectedSeats.map((seat) => (
                        <li key={seat.id}>Row {seat.row} Seat {seat.number}</li>
                    ))}
                </ul>
                <p>Total Cost: ${totalCost}</p>
                <div className="booking-buttons">
                    <button className="ui button" onClick={onClose}>Cancel</button>
                    <button className="ui button primary" onClick={() => console.log('seats...')}>Checkout Seats
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default BookingPopup;
