import React from 'react'
import './UsersList.scss'

type UsersListProps = {}

const UsersList: React.FC<UsersListProps> = () => {

    return (
        <div className="users-list">
            {
                new Array(20).fill('').map(u => (
                    <div className="users-list__item">

                        <div className="users-list__avatar">
                            <img src="https://dingo.com.ua/source/waterfalls/175.jpg" alt="pic" />
                        </div>

                        <p className="users-list__name">Aleksandrf Safronov</p>

                        <div className="users-list__status online"></div>

                    </div>
                ))
            }
        </div>
    )
}

export default UsersList