import React from 'react';
import { View, StyleSheet, Text, Image, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import Auth from '../services/Auth';

export default class ForgotPasswordScreen extends React.Component {

    _auth = null;
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            hasEmail: true,
            loading: false
        };

        this._auth = new Auth();
    }

    _doSendEmail = async () => {
        
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
            
            if(this.state.email) {

                Keyboard.dismiss();
                this.setState({
                    loading: true
                });

                let response = await this._auth.sendForgetPassEmail(this.state.email.trim());
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
                    Alert.alert(
                        'Success',
                        'An email has been sent successfully.',
                        [
                          {text: 'OK'}
                        ],
                        { cancelable: false }
                      );
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
                    <Button onPress={this._doSendEmail}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Send Email' />
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