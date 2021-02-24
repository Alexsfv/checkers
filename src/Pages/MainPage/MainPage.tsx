import React from 'react'
import { useDispatch } from 'react-redux'
import { sagasActions } from '../../store/saga/sagasActions'

type MainPageProps = {}

const MainPage: React.FC<MainPageProps> = () => {

    const dispatch = useDispatch()

    const fetchUserData = () => {
        dispatch(sagasActions.initialUser())
    }

    return (
        <>
            <h1>Main Page</h1>
            <button onClick={fetchUserData}>Initial user</button>
        </>
    )
}

export default MainPage