import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

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
            title: 'Sign Up'
        }
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            title: 'Forgot Password'
        }
    } 
}, 
{
    initialRouteName: 'SignIn'
});