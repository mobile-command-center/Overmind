import React, { Component } from 'react';
import SideBar from '../components/sidebar';
import NavigationBar from '../components/navigationbar';
import Footer from '../components/footer';
import Content from '../components/content';

export default class DashBoard extends Component {
    render() {
        return (
            <div>
                <SideBar></SideBar>
                <div class="main-panel">
                    <NavigationBar></NavigationBar>
                    <Content></Content>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}