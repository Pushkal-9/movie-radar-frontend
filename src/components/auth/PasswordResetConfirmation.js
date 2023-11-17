import React from 'react';
import { Icon, Message } from 'semantic-ui-react';
import styles from './auth.module.css';

function PasswordResetConfirmation() {
    return (
        <main className={styles.mainContainer}>
            <Message>
                <Message.Header>Email has been sent!!</Message.Header>
                <div><Icon name='check circle' size='large' />
                    {"A link to reset password is sent to your email. It is valid for an hour."}</div>
            </Message>

        </main>

    );
}

export default PasswordResetConfirmation;