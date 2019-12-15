import React, { Component } from 'react';
import Footer from '../components/footer';
import HomeNavigationBar from '../components/HomeNavigatorBar';
import {
    CognitoUserPool,
    CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import CognitoConfig from '../config/CognitoConfig';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            NAME: '',
            EMAIL: '',
            PASSWORD: '',
            ACTIVATECODE: '',
            activated: false
        };

        const poolData = {
            UserPoolId : CognitoConfig.userPoolId,
            ClientId : CognitoConfig.appClientId
        }

        this.cognitoUser = null;

        this.userPool = new CognitoUserPool(poolData);
    }

    componentDidMount() {
        window.$('.card').removeClass('card-hidden');
    }

    _register = () => {
        const { NAME, EMAIL, PASSWORD } = this.state;
        const attributeName = new CognitoUserAttribute({
            Name: 'email',
            Value: EMAIL
        });

        this.userPool.signUp(NAME, PASSWORD, [attributeName], null ,(err, result) => {
            if(err) {
                if(err.code === 'UsernameExistsException') {
                    alert('이미 가입되어 있는 사용자 입니다.');
                } else if(err.code === 'InvalidParameterException') {
                    alert('비밀번호는 최소 8자리이상의 숫자로 구성되어야 합니다.');
                } else {
                    alert(err.message);
                }
                
                return;
            }

            this.cognitoUser = result.user;
            console.log('user name is '+ this.cognitoUser.getUsername());
            this.setState({
                ...this.state,
                activated : true
            });
        });
    };

    _activate = () => {
        this.cognitoUser.confirmRegistration(this.state.ACTIVATECODE, true, (err, result) => {
            if(err) {
                alert(err);
                return;
            }

            window.location.href = '/';
        });
    }

    _onChangeHandler = (e) => {
        const newState = {
            ...this.state,
            [e.target.name] : String(e.target.value)
        };

        this.setState(newState);
    };

    _renderSignUp() {
        return(
            <form className="form" method="" action="">
                <div className="form-group has-default">
                    <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                        <i className="material-icons">face</i>
                        </span>
                    </div>
                    <input type="text" className="form-control" placeholder="이름..." name="NAME" value={this.state.NAME} onChange={this._onChangeHandler}/>
                    </div>
                </div>
                <div className="form-group has-default">
                    <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                        <i className="material-icons">mail</i>
                        </span>
                    </div>
                    <input type="text" className="form-control" placeholder="이메일..." name="EMAIL" value={this.state.EMAIL} onChange={this._onChangeHandler}/>
                    </div>
                </div>
                <div className="form-group has-default">
                    <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                        <i className="material-icons">lock_outline</i>
                        </span>
                    </div>
                    <input type="password" placeholder="비밀번호..." className="form-control" name="PASSWORD" value={this.state.PASSWORD} onChange={this._onChangeHandler}/>
                    </div>
                </div>
            </form> 
        );
    }

    _renderActivation() {
        return(
            <form className="form" method="" action="">
                <div className="text-center">
                    이메일로 전송된 인증코드를 인력해 주세요.
                </div>
                <div className="form-group has-default">
                    <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                        <i className="material-icons">lock_open</i>
                        </span>
                    </div>
                    <input type="text" className="form-control" placeholder="인증코드..." name="ACTIVATECODE" value={this.state.ACTIVATECODE} onChange={this._onChangeHandler}/>
                    </div>
                </div>
            </form> 
        );        
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
                            <div className="col-md-5 ml-auto mr-auto">
                                <div className="card card-signup">
                                    <h2 className="card-title text-center">Register</h2>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col ml-auto">
                                                {this.state.activated ? this._renderActivation() : this._renderSignUp()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        { this.state.activated ? 
                                            <a href="#pablo" className="btn btn-primary btn-round" onClick={this._activate}>확인</a>:
                                            <a href="#pablo" className="btn btn-primary btn-round mt-4" onClick={this._register}>회원 가입</a>
                                        }
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