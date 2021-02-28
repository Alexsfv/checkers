import React from 'react'
import Chat from '../../Components/auth/Chat/Chat'
import UsersList from '../../Components/auth/UsersList/UsersList'
import './ChatPage.scss'

type ChatPageProps = {}

const ChatPage: React.FC<ChatPageProps> = () => {



    return (
        <div className="global-chat">
            <div className="global-chat__container">
                <Chat />
            </div>
            <div className="global-chat__users-list">
                <UsersList/>
            </div>
        </div>
    )
}

export default ChatPage