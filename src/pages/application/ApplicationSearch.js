import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import ApplicationTable from '../../components/application/ApplicationTable';

export default class ApplicationSearch extends Component {
    render() {
        const { match } = this.props;
        const searchText = match.params.searchText;

        return (
            <div>
                <SideBar activeTab="application"></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <ApplicationTable searchText={searchText}></ApplicationTable>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}