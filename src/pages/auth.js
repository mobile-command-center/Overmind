import { Component } from 'react';
import {
    CognitoUserPool
} from 'amazon-cognito-identity-js';
import CognitoConfig from '../config/CognitoConfig';


export default class Auth extends Component {
    componentDidMount() {
        this._checkLogin()
    }

    _checkLogin() {

        const pathname = window.location.pathname;
            
        if (pathname === '/' || pathname.includes('/register')) {
            return;
        } else {
            const poolData = { 
                UserPoolId : CognitoConfig.userPoolId,
                ClientId : CognitoConfig.appClientId
            };
    
            const userPool = new CognitoUserPool(poolData);
            const cognitoUser = userPool.getCurrentUser();
    
            if (cognitoUser != null) {
                cognitoUser.getSession(function(err, session) {
                    if (err) {
                        window.location.href = '/';
                        return;
                    }
                    console.log('session validity: ' + session.isValid());
                });
            }
        }
    }
    
    render() {
        return(null);
    }
}