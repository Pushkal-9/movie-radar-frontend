import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import styles from './chat.css'

var stompClient = null;

const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        connected: false,
        message: ''
    });
    const [typingNotification, setTypingNotification] = useState('');

    useEffect(() => {
        if (userData.connected && tab !== "CHATROOM") {
            stompClient.subscribe('/user/' + userData.username + '/typing', onTypingReceived);
        }
    }, [userData.connected, tab]);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/chatroom/userlist', onUserListReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    };

    const onUserListReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        const newUserList = new Map();
        payloadData.userList.forEach(user => {
            newUserList.set(user, privateChats.get(user) || []);
        });
        setPrivateChats(newUserList);
    };

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    };

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    };

    const onPrivateMessage = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const onError = (err) => {
        console.log(err);
    };

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
        sendTypingNotification();
    };

    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    };

    const sendTypingNotification = () => {
        if (stompClient && tab !== "CHATROOM" && userData.message) {
            var typingMessage = {
                senderName: userData.username,
                receiverName: tab,
                status: "TYPING"
            };
            stompClient.send("/app/typing", {}, JSON.stringify(typingMessage));
        }
    };

    const onTypingReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (payloadData.status === "TYPING" && payloadData.senderName !== userData.username) {
            setTypingNotification(`${payloadData.senderName} is typing...`);
            setTimeout(() => setTypingNotification(''), 3000); // Clear notification after a delay
        }
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    };

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    };



    const registerUser = () => {
        connect();
    };

    return (
        <div className="chat-container">
            {userData.connected ?
                <>
                    <header className="chat-header">
                        <h2>Welcome, {userData.username}!</h2> {/* Displaying the user's name */}
                    </header>
                    <div className="chat-box">
                        <div className="member-list">
                            <ul>
                                <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
                                {[...privateChats.keys()].map((name, index) => (
                                    <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                                ))}
                            </ul>
                        </div>
                        {tab === "CHATROOM" ?
                            <div className="chat-content">
                                <ul className="chat-messages">
                                    {publicChats.map((chat, index) => (
                                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                                        </li>
                                    ))}
                                </ul>
                                <div className="send-message">
                                    <input type="text" className="input-message" placeholder="Enter message" value={userData.message} onChange={handleMessage} />
                                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                                </div>
                            </div>
                            :
                            <div className="chat-content">
                                <ul className="chat-messages">
                                    {[...privateChats.get(tab)].map((chat, index) => (
                                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName} <p className={"chat-status-tag"}> status </p> </div>}

                                        </li>
                                    ))}
                                </ul>

                                <div className="send-message">
                                    {tab !== "CHATROOM" && <div className="typing-notification">{typingNotification}</div>}
                                    <input type="text" className="input-message" placeholder="Enter message" value={userData.message} onChange={handleMessage} />
                                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                                </div>
                            </div>
                        }
                    </div>
                </>
                :
                <div className="register">
                    <p>Dev note: authenticate role and check for login here once done remove div class 'register' </p>
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                        margin="normal"
                    />
                    <button type="button" onClick={registerUser}>
                        connect
                    </button>
                </div>
            }
        </div>
    )
}

export default ChatRoom