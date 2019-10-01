import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, DashBoard, Enrollment } from '../pages';
import EnrollmentEdit from '../pages/enrollment/EnrollmentEdit';


class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/dashboard" component={DashBoard}/>
                <Switch>
                    <Route path="/enrollment/edit" component={EnrollmentEdit}/>
                    <Route path="/enrollment" component={Enrollment}/>
                </Switch>
            </div>
        );
    }
}

export default App;