import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, DashBoard, Enrollment } from '../pages';
import EnrollmentEdit from '../pages/enrollment/EnrollmentEdit';

// https://velopert.com/3417 리액트 라우터 강좌

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/dashboard" component={DashBoard}/>
                <Switch>
                    <Route path="/enrollment/edit/:EL_ID" component={EnrollmentEdit}/>
                    <Route path="/enrollment/edit" component={EnrollmentEdit}/>
                    <Route path="/enrollment/:EL_ID" component={Enrollment}/>
                    <Route path="/enrollment/" component={Enrollment}/>
                </Switch>
            </div>
        );
    }
}

export default App;