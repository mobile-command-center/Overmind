import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import EnrollmentEditor from '../../components/enrollment/EnrollmentEditor';

export default class EnrollmentEdit extends Component {
    render() {
        const { match } = this.props;
        const EL_ID = match.params.EL_ID;
    
        return (
            <div>
                <SideBar url={"enrollment/edit"}></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <div className="content">
                        <div className="container-fluid">
                            <EnrollmentEditor EL_ID={EL_ID}></EnrollmentEditor>
                            {/* <div className="col-lg-6 col-md-12 ml-auto mr-auto">
                                <ConsultationSearchWidget></ConsultationSearchWidget>
                                <ApplicationTable></ApplicationTable>
                            </div> */}
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}