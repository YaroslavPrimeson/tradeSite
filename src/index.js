import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import './components/index.scss'
import './pages/Landing/index.scss'
import './components/Svg/index.scss'
import './pages/Admin/Admin.scss'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppTest from "./AppTest";
import Admin from "./pages/Admin/Admin"



ReactDOM.render(
    <React.StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={AppTest}/>
                    <Route exact path='/admin' component={Admin}/>
                </Switch>
            </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


