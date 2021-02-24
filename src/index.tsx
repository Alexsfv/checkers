import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './assets/styles/main.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './store/reducers/rootReducer';
import { userSaga } from './store/saga/sagas/UserSaga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './store/saga/rootSaga';

const sagaMiddleWare = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleWare),
))

sagaMiddleWare.run(rootSaga)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'))
reportWebVitals()