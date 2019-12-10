import React, { Component } from 'react';

export default class HomeNavigationBar extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white">
                <div className="container">
                    <div className="navbar-wrapper">
                        <a className="navbar-brand" href="#pablo">Login Page</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                        <span className="navbar-toggler-icon icon-bar"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="/consultation" className="nav-link">
                                <i className="material-icons">dashboard</i> Dashboard
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a href="/register" className="nav-link">
                                <i className="material-icons">person_add</i> Register
                                </a>
                            </li>
                            <li className="nav-item  active ">
                                <a href="/" className="nav-link">
                                <i className="material-icons">fingerprint</i> Login
                                </a>
                            </li>
                            {/* <li className="nav-item ">
                                <a href="../pages/lock.html" className="nav-link">
                                <i className="material-icons">lock_open</i> Lock
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
          </nav>
        );
    }
}