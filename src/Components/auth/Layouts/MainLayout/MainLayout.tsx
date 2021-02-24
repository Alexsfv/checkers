import React, { useState } from 'react'
import './MainLayout.scss'
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import { Link, NavLink } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import InsertChartOutlinedTwoToneIcon from '@material-ui/icons/InsertChartOutlinedTwoTone';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { RootState } from '../../../../store/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../../../store/reducers/UserReducer'
import ListIcon from '@material-ui/icons/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { sagasActions } from '../../../../store/saga/sagasActions';


type MainLayoutProps = {

}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

    const dispatch = useDispatch()
    const user = useSelector<RootState>(state => state.user) as UserState

    const [isShowAside, setShowAside] = useState<boolean>(true)

    const leaveHandler = () => {
        dispatch(sagasActions.logout())
    }

    const bodyClasses = ['main-layout__body']

    if (isShowAside) {
        bodyClasses.push('show-aside')
    }

    return (
        <div className="main-layout">
            <div className="container main-layout__container">
                <div className={bodyClasses.join(' ')}>
                    <div className="main-layout__aside">

                        <div className="main-layout__user">
                            <div className="main-layout__user-img">
                                <img src="https://www.sunhome.ru/i/wallpapers/140/belka-zhivotnoe.xxl.jpg" alt="avatar" />
                            </div>
                            <div className="main-layout__user-info">
                                <p className="main-layout__descr">Имя:</p>
                                <p>Сафронов Александр</p>
                                <p className="main-layout__descr">Никнейм:</p>
                                <p>{user.nickName}</p>
                            </div>
                        </div>

                        <div className="main-layout__links">
                            <ul className="main-layout__links-list">
                                <li>
                                    <NavLink to="/profile" className="main-layout__link-item" activeClassName="active">
                                        <AccountCircleOutlinedIcon /> Профиль
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/chat" className="main-layout__link-item">
                                        <MessageOutlinedIcon /> Чат
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/games" className="main-layout__link-item">
                                        <DeviceHubIcon /> Игры
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/leaders" className="main-layout__link-item">
                                        <InsertChartOutlinedTwoToneIcon /> Лидеры
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about" className="main-layout__link-item">
                                        <InfoOutlinedIcon /> О программе
                                    </NavLink>
                                </li>
                                <li>
                                    <Link to="#" className="main-layout__link-item leave" onClick={leaveHandler}>
                                        <ExitToAppIcon /> Выйти
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="main-layout__content">

                        <div className="main-layout__content-header">
                            <p className="main-layout__header-bread">
                                Профиль
                            </p>

                            <div className="main-layout__header-controls">
                                <button className="main-layout__header-btn menu" onClick={() => setShowAside(!isShowAside)}>
                                    <ListIcon />
                                </button>
                                <button className="main-layout__header-btn update">
                                    <CachedOutlinedIcon />
                                </button>
                            </div>
                        </div>

                        {
                            children
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MainLayout