import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import PaymentTable from '../../components/payment/PaymentTable';

export default class PaymentSearch extends Component {
    render() {
        const { match } = this.props;
        const searchText = match.params.searchText;

        return (
            <div>
                <SideBar url={"payment/search"}></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <PaymentTable searchText={searchText}></PaymentTable>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}