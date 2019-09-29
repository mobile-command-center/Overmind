import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, DashBoard, Enrollment } from '../pages';


class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route path="/admin/dashboard" component={DashBoard}/>
                    <Route path="/admin/enrollment" component={Enrollment}/>
                </Switch>
            </div>
        );
    }
}

export default App;