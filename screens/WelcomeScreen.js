import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import { Button } from 'react-native-elements';

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
            <Image
                style={styles.logo}
                source={require('../assets/images/logo_field.png')}
            />
            <Text style={styles.text}> Welcome to Book2Play </Text>
        </View>
        <View>
            <Button buttonStyle={styles.signInButton} color='#052c52' fontWeight='bold' title='Sign In' onPress={() => this.props.navigation.navigate('SignIn') } />
            <Button buttonStyle={styles.getStartedButton} fontWeight='bold' title='Get Started' onPress={() => this.props.navigation.navigate('GetStarted') }/> 
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    },
    logo: {
      width: 150, 
      height: 150, 
      marginLeft: 40,
      resizeMode:'contain'
    },
    text: {
      fontSize: 22
    },
    signInButton: {
        marginTop: 10,
        backgroundColor: '#efb225',
        width: 230
    },
    getStartedButton: {
        marginTop: 10,
        backgroundColor: '#052c52',
        width: 230
    }
});