import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import './App.scss';
import * as serviceWorker from './serviceWorker';
// Components
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Reset from './components/auth/Reset';
import Dashboard from './components/Dashboard';
// Redux
import { Provider } from 'react-redux'
import store from './components/redux/store/index'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <Provider key = "navigation_store" store = {store}>
        <BrowserRouter key = "navigation">
            <Switch >
                <Route exact path = "/" component = { Login } key = "login" />
                <Route path = "/reset" component = { Reset } key = "reset password" />
                <Route path = "/signup" component = { SignUp } key = "signup" />
                <Route path = "/dashboard" component = { Dashboard } key = "dashboard" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
