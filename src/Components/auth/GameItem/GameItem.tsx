import React from 'react'
import './GameItem.scss'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import { Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { Link } from 'react-router-dom';


type GameItemProps = {
    imgSrc: string
    nickName: string
    rate: string
    bid: string
    privateStatus: boolean
}

const GameItem: React.FC<GameItemProps> = ({ imgSrc, nickName, rate, bid, privateStatus }) => {

    return (
        <div className="game-item">

            <div className="game-item__img">
                <img src={imgSrc} alt="avatar" />
                {
                    privateStatus
                        ? <LockOutlinedIcon className="game-item__private-status" />
                        : <LockOpenOutlinedIcon className="game-item__private-status" />
                }
            </div>

            <div className="game-item__info-block">
                <p className="game-item__info-param">
                    <AccountCircleOutlinedIcon />
                    {nickName}
                </p>
                <p className="game-item__info-param">
                    <GradeOutlinedIcon />
                    {rate}
                </p>
                <p className="game-item__info-param">
                    <LocalOfferOutlinedIcon />
                    {bid}
                </p>
            </div>

            <div className="game-item__controls">
                <Link to="/game/555">
                    <Button>Войти</Button>
                </Link>
            </div>

        </div>
    )
}

export default GameItem