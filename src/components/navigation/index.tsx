import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Components
import Login from '../auth/Login';
import SignUp from '../auth/SignUp';
import Reset from '../auth/Reset';
// Dashboard
import Projects from '../dashboard/projects/projects';
import Messages from '../dashboard/messager/messager';
import StubDashbord from '../dashboard/stub';

export default class Navigation extends Component {

    render(){
        return [
            <BrowserRouter key = "navigation">
                <Switch>
                    <Route exact path = "/" component = { Login } key = "login" />
                    <Route path = "/reset" component = { Reset } key = "reset password" />
                    <Route path = "/signup" component = { SignUp } key = "signup" />
                    <Route path = "/dashboard/projects" component = { Projects }  key = "projects"/>
                    <Route path = "/dashboard/messager" component = { Messages }  key = "messager"/>
                    <Route path = "/dashboard" component = { StubDashbord } key = "not ready" />
                </Switch>
            </BrowserRouter>
        ]
    }
}