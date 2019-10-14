import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import ConsultationTable from '../../components/consultation/ConsultationTable';

export default class ConsultationSearch extends Component {
    render() {
        const { match } = this.props;
        const searchText = match.params.searchText;

        return (
            <div>
                <SideBar url={"/consultation/search"}></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <ConsultationTable searchText={searchText}></ConsultationTable>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}