import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
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
    
    if(userObject) {
        if(userObject.role == 'Field Manager') {
            this.props.navigation.navigate('FacilityManagerTab');
        }
    }
    else {
        this.props.navigation.navigate('PublicRootTab');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#052c52" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    }
});