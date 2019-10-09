import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import NavigationBar from '../../components/navigationbar';
import Footer from '../../components/footer';
import PaymentEditor from '../../components/payment/PaymentEditor';

export default class PaymentEdit extends Component {
    render() {
        const { match } = this.props;
        const PYMT_ID = match.params.PYMT_ID;

        return (
            <div>
                <SideBar></SideBar>
                <div className="main-panel">
                    <NavigationBar></NavigationBar>
                    <div className="content">
                        <div className="container-fluid">
                            <PaymentEditor PYMT_ID={PYMT_ID}></PaymentEditor>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}