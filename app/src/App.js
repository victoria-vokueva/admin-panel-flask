import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import history from './history';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import './styles/style.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            title: 'Список пользователей'
        }
        this.getActive = this.getActive.bind(this);
        this.getTitle = this.getTitle.bind(this);
    }

    getActive(bool) {
        this.setState({ isActive: bool })
    }

    getTitle(name) {
        this.setState({ title: name })
    }

    render() {
        return (
            <BrowserRouter history={history}>
                <div className="wrapper-sidebar">
                    <Sidebar getTitle={this.getTitle} isActive={this.state.isActive} />
                    <div id="wrapper">
                        <Header isActive={this.state.isActive} getActive={this.getActive} />
                        <div id="content">
                            <h1 className="h1">{this.state.title}</h1>
                            <Routes>
                                <Route exact path="/" element={<Users />} />
                                <Route path="/users" element={<Users />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
