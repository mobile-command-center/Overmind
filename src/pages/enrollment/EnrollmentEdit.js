import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import EnrollmentEditor from '../../components/enrollment/EnrollmentEditor';
import ApplicationTable from '../../components/application/ApplicationTable';
import ConsultationSearchWidget from '../../components/consultation/ConsultationSearchWidget';

export default class EnrollmentEdit extends Component {
    render() {
        const { match } = this.props;
        const EL_ID = match.params.EL_ID;
    
        return (
            <div>
                <SideBar></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 ml-auto mr-auto">
                                    <EnrollmentEditor EL_ID={EL_ID}></EnrollmentEditor>
                                </div>
                                <div className="col-lg-6 col-md-12 ml-auto mr-auto">
                                    <ConsultationSearchWidget></ConsultationSearchWidget>
                                    <ApplicationTable></ApplicationTable>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}