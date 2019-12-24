import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, DashBoard, Register, Auth } from '../pages';
// import EnrollmentEdit from '../pages/enrollment/EnrollmentEdit';
import ConsultationEdit from '../pages/consultation/ConsultationEdit'
import ConsultationSearch from '../pages/consultation/ConsultationSearch';
// import PaymentEdit from '../pages/payment/PaymentEdit';
// import PaymentSearch from '../pages/payment/PaymentSearch';
// import EnrollmentSearch from '../pages/enrollment/EnrollmentSearch';
// import ApplicationSearch from '../pages/application/ApplicationSearch';

// https://velopert.com/3417 리액트 라우터 강좌

class App extends Component {
    render() {
        return (
            <div>
                <Auth/>
                <Route exact path="/" component={Home}/>
                <Route path="/dashboard" component={DashBoard}/>
                <Route path="/register" component={Register}/>
                <Switch>
                    <Route path="/consultation/edit/:CONST_ID" component={ConsultationEdit}/>
                    <Route path="/consultation/edit" component={ConsultationEdit}/>
                    <Route path="/consultation/search/:searchText" component={ConsultationSearch}/>
                    <Route path="/consultation/" component={ConsultationSearch}/>
                </Switch>
                {/* <Switch>
                    <Route path="/application/search/:searchText" component={ApplicationSearch}/>
                    <Route path="/application/" component={ApplicationSearch}/>
                </Switch>
                <Switch>
                    <Route path="/enrollment/edit/:EL_ID" component={EnrollmentEdit}/>
                    <Route path="/enrollment/edit" component={EnrollmentEdit}/>
                    <Route path="/enrollment/search/:searchText" component={EnrollmentSearch}/>
                    <Route path="/enrollment/" component={EnrollmentSearch}/>
                </Switch>
                <Switch>
                    <Route path="/payment/edit/:PYMT_ID" component={PaymentEdit}/>
                    <Route path="/payment/edit" component={PaymentEdit}/>
                    <Route path="/payment/search/:searchText" component={PaymentSearch}/>
                    <Route path="/payment/" component={PaymentSearch}/>
                </Switch> */}
            </div>
        );
    }
}

export default App;