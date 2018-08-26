import React from 'react';
import { View, StyleSheet, Text, Image, Alert, ActivityIndicator, Keyboard, Picker, ScrollView } from 'react-native';
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
            userRole: '1',
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

    _doSignUp = async () => {
        
        try {
            if(this.state.fullName == '') {
                this.setState({
                    hasFullName: false
                })
            } 
            else {
                this.setState({
                    hasFullName: true
                });
            }
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
            if(this.state.streetAddress == '') {
                this.setState({
                    hasStreetAddress: false
                })
            } 
            else {
                this.setState({
                    hasStreetAddress: true
                });
            }
            if(this.state.city == '') {
                this.setState({
                    hasCity: false
                })
            } 
            else {
                this.setState({
                    hasCity: true
                });
            }
            if(this.state.country == '') {
                this.setState({
                    hasCountry: false
                })
            } 
            else {
                this.setState({
                    hasCountry: true
                });
            }
            if(this.state.phone == '') {
                this.setState({
                    hasPhone: false
                })
            } 
            else {
                this.setState({
                    hasPhone: true
                });
            }

            if(this.state.fullName && this.state.email && this.state.password && this.state.streetAddress
                && this.state.city && this.state.country && this.state.phone) {

                Keyboard.dismiss();
                this.setState({
                    loading: true
                });

                /*{
                    "name": "Rohaan Ishfaq",
                    "email": "rohaanishfaq@gmail.com",
                    "password": "ronio658",
                    "address": {
                        "streetAddress": "test 123",
                        "poBox": "test 123",
                        "city": "5accce61cf4d6a334ce779d7",
                        "country": "5accce2c19d1bb3d7847a193"
                    },
                    "contactNumber": "03219579116",
                    "role": "Field Manager",
                    "location": {
                        "lat": 25.2048493,
                        "lng": 55.2707828
                    }
                }*/

                let reqObject = {
                    name: this.state.fullName.trim(),
                    email: this.state.email.trim(), 
                    password: this.state.password.trim(),
                    address: {
                        streetAddress: this.state.streetAddress.trim(),
                        poBox: this.state.poBox.trim(),
                        city: this.state.city.trim(),
                        country: this.state.country.trim()
                    },
                    contactNumber: this.state.phone.trim(),
                    role: this.state.userRole,
                    location: {
                        lat: 25.2048493,
                        lng: 55.2707828
                    }   
                }
                let response = await this._auth.signUpUser(reqObject);
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
                    this.props.navigation.navigate('SignIn');
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
            <ScrollView contentContainerStyle={styles.contentContainer}>
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
                        {/* <Picker
                            selectedValue={this.state.city}
                            style={styles.userRole}
                            onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
                            <Picker.Item label="List my field" value="1" />
                            <Picker.Item label="Reserve a field" value="2" />
                        </Picker> */}
                        {!this.state.hasCity ? <FormValidationMessage>{'City is required'}</FormValidationMessage> : null } 
                        
                        <FormInput autoCapitalize='none' placeholder='Country*' inputStyle={styles.formInput} onChangeText={(country) => {this.setState({ country });} } />
                        {!this.state.hasCountry ? <FormValidationMessage>{'Country is required'}</FormValidationMessage> : null } 
                        <FormInput autoCapitalize='none' placeholder='Phone/Mobile*' inputStyle={styles.formInput} onChangeText={(phone) => {this.setState({ phone });} } />
                        {!this.state.hasPhone ? <FormValidationMessage>{'Phone/Mobile is required'}</FormValidationMessage> : null } 
                        
                        <Picker
                            selectedValue={this.state.userRole}
                            style={styles.userRole}
                            onValueChange={(itemValue, itemIndex) => this.setState({userRole: itemValue})}>
                            <Picker.Item label="List my field" value="1" />
                            <Picker.Item label="Reserve a field" value="2" />
                        </Picker>

                        <Button onPress={this._doSignUp}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Create An Account' />
                        <Button buttonStyle={styles.signInButton} fontWeight='bold' title='Sign In' onPress={() => this.props.navigation.navigate('SignIn') }/> 
                        
                        <Text style={styles.terms}>By creating an account, you accept and agree to our <Text style={{textDecorationLine: 'underline'}} onPress={this._goToTermsScreen}>Terms of Use</Text></Text>
                    </View>
                    
                    { this.state.loading ?
                        
                        <View pointerEvents='none' style={styles.loading}>
                            <ActivityIndicator size="large" color="#052c52" />
                        </View>  

                    : null}
                </View>
            </ScrollView>
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
    signInButton: {
        marginTop: 10,
        backgroundColor: '#052c52'
    },
    logo: {
        width: 150, 
        height: 150, 
        marginTop: 10,
        resizeMode:'contain'
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
    terms: { 
        marginLeft: 15, 
        marginTop: 10 
    },
    contentContainer: {
        paddingVertical: 20
    },
    userRole: { 
        width: 350, 
        marginLeft: 10 
    }
});