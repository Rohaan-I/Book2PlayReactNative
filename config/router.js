import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import TermsScreen from '../screens/TermsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import FacilitiesScreen from '../screens/FacilitiesScreen';
import FacilityDetailsScreen from '../screens/FacilityDetailsScreen';


export const AuthStack = createStackNavigator({
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

export const FacilitiesStack = createStackNavigator({
    Facilities: {
        screen:  FacilitiesScreen,
        navigationOptions: {
            title: 'Facilities'
        }
    },
    FacilityDetails: {
        screen: FacilityDetailsScreen,
        navigationOptions: {
            title: 'Facility Details'
        }
    } 
}, 
{
    initialRouteName: 'Facilities'
});


export default PublicRootScreen = createBottomTabNavigator(
  {
    Facilties: FacilitiesStack,
    SignIn: AuthStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Facilties') {
          iconName = `ios-list${focused ? '' : '-outline'}`;
        } else if (routeName === 'SignIn') {
          iconName = `ios-log-in${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#052c52',
      inactiveTintColor: 'gray',
    },
  }
);