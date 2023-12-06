
import React, { Component, Fragment } from 'react';
import Talk from "talkjs";

class ChatSupport extends Component {

    constructor(props) {
        super(props);

        this.inbox = undefined;
        let currentUser;
        const currentTalkjsUser = localStorage.getItem('userDetails');
        if (currentTalkjsUser) {
            currentUser = JSON.parse(currentTalkjsUser)
        }

        this.state = {
            currentUser
        }
    }


    componentDidMount() {
        Talk.ready
            .then(() => {
                const me = new Talk.User(this.state.currentUser);

                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tHQJl8mA",
                        me: me
                    });
                }

                this.inbox = window.talkSession.createInbox();
                this.inbox.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    render() {
        return (
            <Fragment>
                <div style={{ height: '500px', textAlign: 'left' }} className="inbox-container" ref={c => this.container = c}>
                    Loading...
                </div>
            </Fragment>

        );
    }
}

export default ChatSupport;