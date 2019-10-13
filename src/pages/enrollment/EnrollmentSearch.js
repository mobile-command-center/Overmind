import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import EnrollmentTable from '../../components/enrollment/EnrollmentTable';

export default class EnrollmentSearch extends Component {
    render() {
        const { match } = this.props;
        const searchText = match.params.searchText;

        return (
            <div>
                <SideBar url={"/enrollment/search"}></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <EnrollmentTable searchText={searchText}></EnrollmentTable>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}