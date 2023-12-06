


import React, { useEffect, useRef } from 'react';
import Talk from "talkjs";



const Messaging = () => {

    const chatContainerRef = useRef(null);

    useEffect(() => {
        let currentUser;
        const currentTalkjsUser = localStorage.getItem('userDetails');
        if (currentTalkjsUser) {
            currentUser = JSON.parse(currentTalkjsUser);
        }

        Talk.ready
            .then(() => {
                const me = new Talk.User({
                    id: currentUser.id,
                    name: currentUser.name,
                    email: currentUser.email,
                    photoUrl: currentUser.imageUrl,
                    role: "Member",
                });

                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tHQJl8mA",
                        me: me
                    });
                }

                const adminUser = new Talk.User({
                    id: "16",
                    name: "MovieRadar Team",
                    email: "movieradar2023@gmail.com",
                    photoUrl: "https://movie-radar.s3.us-east-2.amazonaws.com/logo-color.png",
                    role: "Member",
                    info: "Software Engineer at TalkJS",
                    welcomeMessage: "Hey there! We Love to have you here at MovieRadar. Please explain your query/issue here, One of our customer service executive will connect with you in as soon as possible."
                });

                const conversationId = Talk.oneOnOneId(me, adminUser);
                const conversation = window.talkSession.getOrCreateConversation(conversationId);
                conversation.setParticipant(me);
                conversation.setParticipant(adminUser);



                const chatBox = window.talkSession.createPopup(conversation);
                chatBox.mount(chatContainerRef.current);
            })
            .catch(e => console.error(e));
    }, []);

    return (
        <div style={{ position: 'relative', height: '500px' }}>
            <div className="inbox-container" ref={chatContainerRef}></div>
        </div>
    );
};

export default Messaging;

