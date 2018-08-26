import React from 'react';
import { View, StyleSheet, Text, Image, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import Auth from '../services/Auth';

export default class SignUpScreen extends React.Component {

    _auth = null;
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            email: '',
            password: '',
            streetAddress: '',
            city: '',
            country: '',
            phone: '',
            hasEmail: true,
            hasPass: true,
            hasFullName: true,
            hasStreetAddress: true,
            hasCity: true,
            hasCountry: true,
            hasPhone: true,
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
                    <FormInput autoCapitalize='none' placeholder='Full Name*' inputStyle={styles.formInput} onChangeText={(fullName) => {this.setState({ fullName });} } />
                    {!this.state.hasFullName ? <FormValidationMessage>{'Full Name is required'}</FormValidationMessage> : null } 
                    <FormInput autoCapitalize='none' placeholder='Email*' inputStyle={styles.formInput} onChangeText={(email) => {this.setState({ email });} } />
                    {!this.state.hasEmail ? <FormValidationMessage>{'Email is required'}</FormValidationMessage> : null } 
                    <FormInput autoCapitalize='none' secureTextEntry placeholder='Password*' inputStyle={styles.formInput} onChangeText={(password) => this.setState({password})} />
                    {!this.state.hasPass ? <FormValidationMessage>{'Password is required'}</FormValidationMessage> : null } 
                    <FormInput autoCapitalize='none' placeholder='Street Address*' inputStyle={styles.formInput} onChangeText={(streetAddress) => {this.setState({ streetAddress });} } />
                    {!this.state.hasStreetAddress ? <FormValidationMessage>{'Street Address is required'}</FormValidationMessage> : null } 
                    <FormInput autoCapitalize='none' placeholder='P.O. Box' inputStyle={styles.formInput} onChangeText={(poBox) => {this.setState({ poBox });} } />
                    <FormInput autoCapitalize='none' placeholder='City*' inputStyle={styles.formInput} onChangeText={(city) => {this.setState({ city });} } />
                    {!this.state.hasCity ? <FormValidationMessage>{'City is required'}</FormValidationMessage> : null } 
                    <FormInput autoCapitalize='none' placeholder='Country*' inputStyle={styles.formInput} onChangeText={(country) => {this.setState({ country });} } />
                    {!this.state.hasCountry ? <FormValidationMessage>{'Country is required'}</FormValidationMessage> : null } 
                    <FormInput autoCapitalize='none' placeholder='Phone/Mobile*' inputStyle={styles.formInput} onChangeText={(phone) => {this.setState({ phone });} } />
                    {!this.state.hasPhone ? <FormValidationMessage>{'Phone/Mobile is required'}</FormValidationMessage> : null } 
                    
                    <Button onPress={this._doSignIn}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Create An Account' />
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