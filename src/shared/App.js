import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, DashBoard } from '../pages';


class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/dashboard" component={DashBoard}/>
            </div>
        );
    }
}

export default App;