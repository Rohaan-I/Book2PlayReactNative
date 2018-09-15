import React from 'react';
import {
  // ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let userObject = await AsyncStorage.getItem('user');
    userObject = JSON.parse(userObject);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    
    // wait for 3 seconds for splash screen.
    setTimeout(() => {
      if(userObject) {
          if(userObject.role == 'Field Manager') {
            this.props.navigation.navigate('FacilityManagerTab');
          }
          else {
            this.props.navigation.navigate('UserTab');
          }
      }
      else {
          this.props.navigation.navigate('Welcome');
      }
    }, 3000);
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../assets/images/logo_field.png')}
        />
        {/* <Text style={styles.text}> Book2Play </Text> */}
        {/* <ActivityIndicator size="large" color="#052c52" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    logo: {
      width: 150, 
      height: 150, 
      marginTop: 10,
      resizeMode:'contain'
    },
    text: {
      fontSize: 22
    }
});