import React from 'react';
import { View, StyleSheet, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import Auth from '../services/Auth';

export default class SignInScreen extends React.Component {

    _auth = null;
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            hasEmail: true,
            hasPass: true,
            loading: false
        };

        this._auth = new Auth();
    }

    _doSignIn = async () => {
        
        try {
            if(this.state.email == '') {
                this.setState({
                    hasEmail: false
                })
            } 
            else {
                this.setState({
                    hasEmail: true
                });
            }
            if(this.state.password == '') {
                this.setState({
                    hasPass: false
                })
            }   
            else {
                this.setState({
                    hasPass: true
                });
            }

            if(this.state.email && this.state.password) {

                this.setState({
                    loading: true
                });

                let response = await this._auth.signInUser(this.state.email, this.state.password);
                console.log(response);

                this.setState({
                    loading: false
                });

                if(!response.success) {
                    Alert.alert(
                        'Error',
                        response.message,
                        [
                          {text: 'OK'}
                        ],
                        { cancelable: false }
                      );
                }
            }
        }
        catch(err) {

            this.setState({
                loading: false
            });

            console.log(err);
            Alert.alert(
                'Error',
                'An error ocurred.',
                [
                  {text: 'OK'}
                ],
                { cancelable: false }
              );
        }
    }

    _goToForgotPassScreen = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logo_field.png')}
                />
                <View>
                    <FormInput autoCapitalize='none' placeholder='Email*' inputStyle={styles.formInput} onChangeText={(email) => {this.setState({ email });} } />
                    {!this.state.hasEmail ? <FormValidationMessage>{'Email is required'}</FormValidationMessage> : null } 
                    <FormInput autoCapitalize='none' secureTextEntry placeholder='Password*' inputStyle={styles.formInput} onChangeText={(password) => this.setState({password})} />
                    {!this.state.hasPass ? <FormValidationMessage>{'Password is required'}</FormValidationMessage> : null } 
                    <Button onPress={this._doSignIn}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Sign In' />
                    <Button buttonStyle={styles.signUpButton} fontWeight='bold' title='Register' onPress={() => this.props.navigation.navigate('SignUp') }/> 
                </View>
                <View>
                    <Text style={styles.forgotPassBtn} onPress={this._goToForgotPassScreen}>Forgot your password?</Text>
                </View>
                { this.state.loading ?
                    
                    <View style={{marginTop: 20}}>
                        <ActivityIndicator size="large" color="#052c52" />
                        <Text> Signing In... </Text>
                    </View>  

                : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    formInput: {
        paddingLeft: 5
    },
    button: {
        marginTop: 10,
        backgroundColor: '#efb225'
    },
    signUpButton: {
        marginTop: 10,
        backgroundColor: '#052c52'
    },
    logo: {
        width: 150, 
        height: 150, 
        marginTop: 10
    },
    forgotPassBtn: {
        textDecorationLine: 'underline', 
        marginTop: 20
    }
});