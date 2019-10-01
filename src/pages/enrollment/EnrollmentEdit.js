import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import EnrollmentEditor from '../../components/enrollment/EnrollmentEditor';

export default class EnrollmentEdit extends Component {
    render() {
        return (
            <div>
                <SideBar></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <EnrollmentEditor></EnrollmentEditor>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}