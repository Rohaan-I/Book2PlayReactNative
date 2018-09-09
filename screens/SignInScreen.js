import React from 'react';
import { View, StyleSheet, Text, Image, Alert, ActivityIndicator, Keyboard, AsyncStorage } from 'react-native';
import { Button, FormInput, FormValidationMessage } from 'react-native-elements';

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

                Keyboard.dismiss();
                this.setState({
                    loading: true
                });

                let response = await this._auth.signInUser(this.state.email.trim(), this.state.password.trim());
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
                else {
                    // storing user role and login flag in async storage.
                    AsyncStorage.setItem('token', response.token);
                    AsyncStorage.setItem('user', JSON.stringify(response.user));
                    

                    this.setState({
                        email: ''
                    });
                    this.setState({
                        password: ''
                    });

                    if(response.user.role == 'Field Manager') {
                        this.props.navigation.navigate('FacilityManagerTab');
                    }
                }
            }
        }
        catch(err) {
            Keyboard.dismiss();
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

    _goToTermsScreen = () => {
        this.props.navigation.navigate('Terms');
    }

    _goToPrivacyScreen = () => {
        this.props.navigation.navigate('Privacy');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logo_field.png')}
                />
                <View>
                    <FormInput autoCapitalize='none' 
                    placeholder='Email*' 
                    inputStyle={styles.formInput} 
                    onChangeText={(email) => {this.setState({ email });}} 
                    value={this.state.email} 
                    onSubmitEditing={() => { this.passInput.focus(); }}
                    />
                    {!this.state.hasEmail ? <FormValidationMessage>{'Email is required'}</FormValidationMessage> : null } 
                    <FormInput autoCapitalize='none' 
                    secureTextEntry placeholder='Password*' 
                    inputStyle={styles.formInput} 
                    onChangeText={(password) => this.setState({password})} 
                    value={this.state.password} 
                    ref={(input) => { this.passInput = input; }}
                    />
                    {!this.state.hasPass ? <FormValidationMessage>{'Password is required'}</FormValidationMessage> : null } 
                    <Button onPress={this._doSignIn}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Sign In' />
                    <Button buttonStyle={styles.signUpButton} fontWeight='bold' title='Register' onPress={() => this.props.navigation.navigate('SignUp') }/> 
                </View>
                <View>
                    <Text style={styles.forgotPassBtn} onPress={this._goToForgotPassScreen}>Forgot your password?</Text>
                </View>
                
                <View style={styles.policy}>
                    <Text style={styles.termsBtn} onPress={this._goToTermsScreen}>Terms</Text>
                    <Text style={styles.privacyBtn} onPress={this._goToPrivacyScreen}>Privacy</Text>
                </View>
                { this.state.loading ?
                    
                    <View pointerEvents='none' style={styles.loading}>
                        <ActivityIndicator size="large" color="#052c52" />
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
        paddingLeft: 5,
        color: '#052c52'
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
        marginTop: 10,
        resizeMode:'contain'
    },
    forgotPassBtn: {
        textDecorationLine: 'underline', 
        marginTop: 20
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5fcff88'
    },
    policy: {
        flex:1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    termsBtn: {
        textDecorationLine: 'underline'
    },
    privacyBtn: {
        textDecorationLine: 'underline', 
        marginTop: 10
    }
});