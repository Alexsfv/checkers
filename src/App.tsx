import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss'
import { MainRouter } from './router/router';
import { sagasActions } from './store/saga/sagasActions';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(sagasActions.initialApp())
    }, [])

    return (
        <MainRouter/>
    )
}

export default App;
