import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import ConsultationTable from '../../components/consultation/ConsultationTable';

export default class ConsultationSearch extends Component {
    render() {
        return (
            <div>
                <SideBar></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <ConsultationTable></ConsultationTable>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}