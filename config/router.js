import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

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
    } 
}, 
{
    initialRouteName: 'SignIn'
});