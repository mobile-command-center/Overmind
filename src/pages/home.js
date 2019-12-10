import React, { Component } from 'react';
import Footer from '../components/footer';
import HomeNavigationBar from '../components/HomeNavigatorBar';

export default class Home extends Component {

    componentDidMount() {
        window.$('.card').removeClass('card-hidden');
    }
    
    render() {
        const styles = {
            backgroundImage: `url(../../assets/img/login.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center'
        }
        
        return (
            <div>
                <HomeNavigationBar/>
                <div className="page-header login-page header-filter" filter-color="black" style={styles}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
                                <form className="form" method="" action="">
                                    <div className="card card-login card-hidden">
                                        <div className="card-header card-header-rose text-center">
                                            <h4 className="card-title">Login</h4>
                                            <div className="social-line">
                                                <a href="#pablo" className="btn btn-just-icon btn-link btn-white">
                                                    <i className="fa fa-facebook-square"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card-body ">
                                            <span className="bmd-form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="material-icons">email</i>
                                                        </span>
                                                    </div>
                                                    <input type="email" className="form-control" placeholder="Email..."/>
                                                </div>
                                            </span>
                                            <span className="bmd-form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="material-icons">lock_outline</i>
                                                        </span>
                                                    </div>
                                                    <input type="password" className="form-control" placeholder="Password..."/>
                                                </div>
                                            </span>
                                        </div>
                                        <div className="card-footer justify-content-center">
                                            <a href="#pablo" className="btn btn-rose btn-link btn-lg">로그인</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}