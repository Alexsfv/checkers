import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './assets/styles/main.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


const app = (
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
)


ReactDOM.render(app, document.getElementById('root'))
reportWebVitals()