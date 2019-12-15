import React, { Component } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import CognitoConfig from '../config/CognitoConfig';

export default class NavigationBar extends Component {
    state = {
        search: '',
    }
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    _logOut = () => {
        const poolData = { 
            UserPoolId : CognitoConfig.userPoolId,
            ClientId : CognitoConfig.appClientId
        };

        const userPool = new CognitoUserPool(poolData);
        const cognitoUser = userPool.getCurrentUser();

        cognitoUser.signOut();

        window.localStorage.clear();

        window.location.href = '/';
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                <div className="navbar-wrapper">
                    <div className="navbar-minimize">
                    <button id="minimizeSidebar" className="btn btn-just-icon btn-white btn-fab btn-round">
                        <i className="material-icons text_align-center visible-on-sidebar-regular">more_vert</i>
                        <i className="material-icons design_bullet-list-67 visible-on-sidebar-mini">view_list</i>
                    </button>
                    </div>
                    <a className="navbar-brand" href="#pablo">Dashboard</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end">
                    {/* <form className="navbar-form">
                        <div className="input-group no-border">
                            <input type="text" value={this.state.search} onChange={this.handleChange}className="form-control" placeholder="Search..."/>
                            <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                <i className="material-icons">search</i>
                                <div className="ripple-container"></div>
                            </button>
                        </div>
                    </form> */}
                    <ul className="navbar-nav">
                    {/* <li className="nav-item">
                        <a className="nav-link" href="#pablo">
                        <i className="material-icons">dashboard</i>
                        <p className="d-lg-none d-md-block">
                            Stats
                        </p>
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="material-icons">notifications</i>
                        <span className="notification">5</span>
                        <p className="d-lg-none d-md-block">
                            Some Actions
                        </p>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#12">Mike John responded to your email</a>
                        <a className="dropdown-item" href="#34">You have 5 new tasks</a>
                        <a className="dropdown-item" href="#56">You're now friend with Andrew</a>
                        <a className="dropdown-item" href="#78">Another Notification</a>
                        <a className="dropdown-item" href="#90">Another One</a>
                        </div>
                    </li> */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#pablo" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="material-icons">person</i>
                        <p className="d-lg-none d-md-block">
                            Account
                        </p>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                        <a className="dropdown-item" href="#profile">Profile</a>
                        <a className="dropdown-item" href="#setting">Settings</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#logout" onClick={this._logOut}>Log out</a>
                        </div>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        );
    }
}