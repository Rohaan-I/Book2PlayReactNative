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
import BookingsScreen from '../screens/BookingsScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';
import MyFacilitiesScreen from '../screens/MyFacilitiesScreen';
import AddFacilityScreen from '../screens/BookingDetailsScreen';
import EditFacilityScreen from '../screens/EditFacilityScreen';
import DeleteFacilityScreen from '../screens/DeleteFacilityScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import GetStartedScreen from '../screens/GetStartedScreen';


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

export const BookingsStack = createStackNavigator({
    Bookings: {
        screen:  BookingsScreen,
        navigationOptions: {
            title: 'Bookings'
        }
    },
    BookingDetails: {
        screen: BookingDetailsScreen,
        navigationOptions: {
            title: 'Booking Details'
        }
    } 
}, 
{
    initialRouteName: 'Bookings'
});

export const MyFacilitiesStack = createStackNavigator({
    MyFacilities: {
        screen:  MyFacilitiesScreen,
        navigationOptions: {
            title: 'My Facilities'
        }
    },
    AddFacility: {
        screen: AddFacilityScreen,
        navigationOptions: {
            title: 'Add New Facility'
        }
    },
    EditFacility: {
        screen: EditFacilityScreen,
        navigationOptions: {
            title: 'Edit Facility'
        }
    },
    DeleteFacility: {
        screen: DeleteFacilityScreen,
        navigationOptions: {
            title: 'Delete Facility'
        }
    }   
}, 
{
    initialRouteName: 'MyFacilities'
});

export const FacilityManagerTabScreen = createBottomTabNavigator(
    {
      Facilties: FacilitiesStack,
      Bookings: BookingsStack,
      MyFacilities: {
        screen:  MyFacilitiesStack,
        navigationOptions: {
            title: 'My Facilities'
        }
      },
      MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: {
            title: 'My Account'
        }
      },
      Notifications: NotificationsScreen
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Facilties') {
            iconName = `ios-list`;
          } else if (routeName === 'Bookings') {
            iconName = `ios-calendar`;
          } else if (routeName === 'MyFacilities') {
            iconName = `ios-list-box`;
          } else if (routeName === 'MyAccount') {
            iconName = `ios-contact`;
          } else if (routeName === 'Notifications') {
            iconName = `ios-notifications-outline`;
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


export const PublicRootTabScreen = createBottomTabNavigator(
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
          iconName = `ios-list`;
        } else if (routeName === 'SignIn') {
          iconName = `ios-log-in`;
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

export const WelcomeStack = createStackNavigator({
    Welcome: {
        screen:  WelcomeScreen,
        navigationOptions: {
            title: 'Welcome'
        }
    },
    GetStarted: {
        screen:  GetStartedScreen,
        navigationOptions: {
            title: 'Get Started'
        }
    }
}, 
{
    initialRouteName: 'Welcome'
});

export default MainNavigator = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Welcome: WelcomeStack,
      PublicRootTab: PublicRootTabScreen,
      FacilityManagerTab: FacilityManagerTabScreen,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  );
  