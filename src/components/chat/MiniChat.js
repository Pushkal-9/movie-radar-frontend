import React, { useState } from 'react';
import './mini-chat.css';

function MiniChat() {
    const [isOpen, setIsOpen] = useState(false);

    const openForm = () => {
        setIsOpen(true);
    };

    const closeForm = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button className="open-button" onClick={openForm}>Chat</button>

            {isOpen && (
                <div className="chat-popup">
                    <form action="/action_page.php" className="form-container">
                        <i className="fa-solid fa-chalkboard-user"></i> <h3>Chat with us</h3>

                        <label htmlFor="msg">This is an example for now</label>
                        <textarea placeholder="Type message.." name="msg" required></textarea>

                        <button type="submit" className="btn">Send</button>
                        <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default MiniChat;
