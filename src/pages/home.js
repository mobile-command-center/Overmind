import React, { Component } from 'react';
import Footer from '../components/footer';
import HomeNavigationBar from '../components/HomeNavigatorBar';
import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUser
} from 'amazon-cognito-identity-js';
import CognitoConfig from '../config/CognitoConfig';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            EMAIL: '',
            PASSWORD: ''
        };

        const poolData = {
            UserPoolId : CognitoConfig.userPoolId,
            ClientId : CognitoConfig.appClientId
        }

        this.userPool = new CognitoUserPool(poolData);
    }

    componentDidMount() {
        window.$('.card').removeClass('card-hidden');
    }

    _login = () => {
        const { EMAIL, PASSWORD } = this.state;

        const authenticationData = {
            Username: EMAIL,
            Password: PASSWORD
        };

        const userData = {
            Username: EMAIL,
            Pool: this.userPool
        };

        const authenticationDetails = new AuthenticationDetails(authenticationData);
        const cognitoSignedUser = new CognitoUser(userData);

        cognitoSignedUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                // 로그인에 성공하면 Token이 반환되어 옵니다.
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                // API Gateway로 만든 API에 Request를 보낼 때는 Authorization 헤더의 값으로 idToken을 넣어야합니다.
                console.log('idToken + ' + result.idToken.jwtToken);

                window.location.href = '/consultation';
              },
            onFailure: function(err) {
                if(err.code === 'NotAuthorizedException') {
                    alert('잘못된 이메일 주소 또는 비밀번호 입니다.');
                    return;
                } else {
                    alert(err);
                    return;
                }
            }
        })
    }

    _onChangeHandler = (e) => {
        const newState = {
            ...this.state,
            [e.target.name] : String(e.target.value)
        };

        this.setState(newState);
    };

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
                                                    <input type="email" className="form-control" placeholder="Email..." name="EMAIL" value={this.state.EMAIL} onChange={this._onChangeHandler}/>
                                                </div>
                                            </span>
                                            <span className="bmd-form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="material-icons">lock_outline</i>
                                                        </span>
                                                    </div>
                                                    <input type="password" className="form-control" placeholder="Password..." name="PASSWORD" value={this.state.PASSWORD} onChange={this._onChangeHandler}/>
                                                </div>
                                            </span>
                                        </div>
                                        <div className="card-footer justify-content-center">
                                            <a href="#pablo" className="btn btn-rose btn-link btn-lg" onClick={this._login}>로그인</a>
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