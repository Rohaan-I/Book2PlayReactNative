import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import TermsScreen from '../screens/TermsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';

export default AuthStack = createStackNavigator({
    SignIn: {
        screen:  SignInScreen,
        navigationOptions: {
            title: 'Sign In'
        }
    },
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            title: 'Register'
        }
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            title: 'Forgot Password'
        }
    },
    Terms: {
        screen: TermsScreen,
        navigationOptions: {
            title: 'Terms and Conditions'
        }
    },
    Privacy: {
        screen: PrivacyScreen,
        navigationOptions: {
            title: 'Privacy Policy'
        }
    } 
}, 
{
    initialRouteName: 'SignIn'
});