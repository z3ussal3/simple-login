import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
/**
 * Declare layouts
 */
import Main from './layouts/main';
import Blank from './layouts/blank';
import LoginLayout from './layouts/login';
import RegisterLayout from './layouts/register';

/**
 * Declare pages
 */
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import Login from './pages/login';
import Profile from './pages/profile';

export default () => {
    return (
        <Router>
            <Route exact path="/" component={() => <Main><Home /></Main>} />
            <Route exact path="/dashboard" component={() => <Main><Dashboard /></Main>} />
            <Route exact path="/users" component={() => <Main><Users /></Main>} />
            <Route path="/profile/:userId" component={() => <Main><Profile /></Main>} />
            {/* <Route path="/login" component={() => <LoginLayout><Login /></LoginLayout>} /> */}
            <Route path="/login" component={() => <LoginLayout />} />
            <Route path="/register" component={() => <RegisterLayout />} />
        </Router>
    );
}