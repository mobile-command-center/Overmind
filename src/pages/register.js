import React, { Component } from 'react';
import Footer from '../components/footer';
import HomeNavigationBar from '../components/HomeNavigatorBar';

export default class Register extends Component {

    componentDidMount() {
        window.$('.card').removeClass('card-hidden');
    }
    
    render() {
        const styles = {
            backgroundImage: `url(../../assets/img/register.jpg)`,
        }
        
        return (
            <div>
                <HomeNavigationBar/>
                <div className="page-header register-page header-filter" filter-color="black" style={styles}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 ml-auto mr-auto">
                                <div className="card card-signup">
                                    <h2 className="card-title text-center">Register</h2>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-5 ml-auto">
                                                <div className="info info-horizontal">
                                                    <div className="icon icon-rose">
                                                        <i className="material-icons">timeline</i>
                                                    </div>
                                                    <div className="description">
                                                        <h4 className="info-title">Marketing</h4>
                                                        <p className="description">
                                                            We've created the marketing campaign of the website. It was a very interesting collaboration.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="info info-horizontal">
                                                    <div className="icon icon-primary">
                                                        <i className="material-icons">code</i>
                                                    </div>
                                                    <div className="description">
                                                        <h4 className="info-title">Fully Coded in HTML5</h4>
                                                        <p className="description">
                                                            We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="info info-horizontal">
                                                    <div className="icon icon-info">
                                                        <i className="material-icons">group</i>
                                                    </div>
                                                    <div className="description">
                                                        <h4 className="info-title">Built Audience</h4>
                                                        <p className="description">
                                                            There is also a Fully Customizable CMS Admin Dashboard for this product.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 mr-auto">
                                                <form className="form" method="" action="">
                                                    <div className="form-group has-default">
                                                        <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                            <i className="material-icons">face</i>
                                                            </span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="이름..."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group has-default">
                                                        <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                            <i className="material-icons">mail</i>
                                                            </span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="이메일..."/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group has-default">
                                                        <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                            <i className="material-icons">lock_outline</i>
                                                            </span>
                                                        </div>
                                                        <input type="password" placeholder="비밀번호..." className="form-control"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label">
                                                        <input className="form-check-input" type="checkbox" value="" checked=""/>
                                                        <span className="form-check-sign">
                                                            <span className="check"></span>
                                                        </span>
                                                        I agree to the
                                                        <a href="#something"> terms and conditions</a>.
                                                        </label>
                                                    </div>
                                                    <div className="text-center">
                                                        <a href="#pablo" className="btn btn-primary btn-round mt-4">Get Started</a>
                                                    </div>
                                                </form> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        );
    }
}