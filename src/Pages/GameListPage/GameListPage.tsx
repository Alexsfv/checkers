import React, { useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import './GameListPage.scss'
import { NavLink } from 'react-router-dom';
import GameItem from '../../Components/auth/GameItem/GameItem';


type GameListPageProps = {}

const GameListPage: React.FC<GameListPageProps> = () => {



    return (
        <div className="games">
            <div className="games__type-list">

                <NavLink to="/games/public" className="games__game-type" activeClassName="active">
                    <LockOpenOutlinedIcon />
                    <p className="games__game-type-name">Открытые игры</p>
                </NavLink>
                <NavLink to="/games/private" className="games__game-type" activeClassName="active">
                    <LockOutlinedIcon />
                    <p className="games__game-type-name">Закрытые игры</p>
                </NavLink>

            </div>

            <div className="games__list">
                {
                    new Array(20).fill('').map(c => (
                        <GameItem
                            imgSrc="https://img3.goodfon.ru/original/320x240/2/c1/kot-koshka-mordochka-glazischa.jpg"
                            nickName="Alexsfv"
                            rate="33522"
                            bid="1235"
                            privateStatus={true}
                            key={Math.random()}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default GameListPage