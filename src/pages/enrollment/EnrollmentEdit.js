import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import EnrollmentEditor from '../../components/enrollment/EnrollmentEditor';

export default class EnrollmentEdit extends Component {
    render() {
        const { location } = this.props;
        const query = location.search.match(/EL_ID=([^&]*)/);
        const EL_ID = query ? query[1]: undefined;
    
        return (
            <div>
                <SideBar></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <EnrollmentEditor EL_ID={EL_ID}></EnrollmentEditor>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}