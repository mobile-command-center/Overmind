import React, { Component } from 'react';
import SideBar from '../components/sidebar';
import NavigationBar from '../components/navigationbar';
import Footer from '../components/footer';
import EnrollmentTable from '../components/enrollmentTable';

export default class Enrollment extends Component {
    render() {
        return (
            <div>
                <SideBar></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <EnrollmentTable></EnrollmentTable>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}