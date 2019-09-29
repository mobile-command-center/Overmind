import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return(
            <footer className="footer">
                <div className="container-fluid">
                    <nav className="float-left">
                        <ul>
                            <li>
                                <a href="https://www.linkedin.com/in/kim-jingu-152239ab/">
                                Jingu, Kim
                                </a>
                            </li>
                            <li>
                                <a href="https://luyin.tistory.com">
                                Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="copyright float-right">
                        &copy;
                        <script>
                        document.write(new Date().getFullYear())
                        </script>, made with <i className="material-icons">favorite</i> by
                        <a href="https://www.linkedin.com/in/kim-jingu-152239ab/">Luyin</a> for a better web.
                    </div>
                </div>
            </footer>
        );
    }
}