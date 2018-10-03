import React from 'react';
import { View, Text, ScrollView, StyleSheet, AsyncStorage, KeyboardAvoidingView, Image, Picker, ActivityIndicator } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

import Facility from '../services/Facility';
import Account from '../services/Account';

export default class MyAccountScreen extends React.Component {
    
    constructor(props) {
        super(props);

        _facility = null;
        _account = null;

        this.state = {
            fullName: '',
            streetAddress: '',
            poBox: '',
            city: '',
            country: '',
            phone: '',
            hasFullName: true,
            hasStreetAddress: true,
            hasPoBox: true,
            hasPhone: true,
            loading: false,
            screenLoading: false,
            cities: [],
            countries: []
        };

        this._facility = new Facility();
        this._account = new Account();
    }

    componentDidMount() {

        this.setState({
            screenLoading: true
        });

        this._facility.getCities()
        .then(cities => {
            this.setState({
                cities: cities
            });
            this.setState({
                city: cities[0]._id
            });

            return this._facility.getCountries();
        })
        .then(countries => {
            this.setState({
                countries: countries
            });
            this.setState({
                country: countries[0]._id
            });
            
            this.setState({
                screenLoading: false
            });
            
        })
        .catch(err => {
            console.log(err);
            this.setState({
                screenLoading: false
            });     
            Alert.alert(
                'Error',
                'An error ocurred.',
                [
                {text: 'OK'}
                ],
                { cancelable: false }
            );
        });
    }

    _doSignOut = () => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        
        this.props.navigation.navigate('SignIn');
    };

    _updateProfile = () => {

    };

    render() {
        return (
            <View>
                <KeyboardAvoidingView 
                    behavior='padding'
                    keyboardVerticalOffset={100}>

                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={styles.container}>
                            <Image
                                style={styles.logo}
                                source={require('../assets/images/logo_field.png')}
                            />
                            <View>
                                <FormInput autoCapitalize='none' 
                                placeholder='Full Name*' 
                                inputStyle={styles.formInput} 
                                onChangeText={(fullName) => {this.setState({ fullName });} } 
                                underlineColorAndroid='#052c52'
                                value={this.state.fullName} 
                                onSubmitEditing={() => { this.addressInput.focus(); }}
                                />
                                {!this.state.hasFullName ? <FormValidationMessage>{'Full Name is required'}</FormValidationMessage> : null } 
                                
                                <FormInput autoCapitalize='none' 
                                placeholder='Street Address*' 
                                inputStyle={styles.formInput} 
                                onChangeText={(streetAddress) => {this.setState({ streetAddress });} } 
                                underlineColorAndroid='#052c52'
                                value={this.state.streetAddress}
                                ref={(input) => { this.addressInput = input; }} 
                                onSubmitEditing={() => { this.poBoxInput.focus(); }}
                                />
                                {!this.state.hasStreetAddress ? <FormValidationMessage>{'Street Address is required'}</FormValidationMessage> : null } 
                                
                                <FormInput autoCapitalize='none' 
                                placeholder='P.O. Box*' 
                                inputStyle={styles.formInput} 
                                onChangeText={(poBox) => {this.setState({ poBox });} } 
                                underlineColorAndroid='#052c52'
                                value={this.state.poBox}
                                ref={(input) => { this.poBoxInput = input; }} 
                                onSubmitEditing={() => { this.phoneInput.focus(); }}
                                />
                                {!this.state.hasPoBox ? <FormValidationMessage>{'P.O. Box is required'}</FormValidationMessage> : null } 
                                
                                <FormLabel>City</FormLabel>
                                <Picker
                                    selectedValue={this.state.city}
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
                                    {this.state.cities.map(city => <Picker.Item key={city._id} label={city.city} value={city._id} /> )}
                                </Picker>
                                
                                <FormLabel>Country</FormLabel>
                                <Picker
                                    selectedValue={this.state.country}
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
                                    {this.state.countries.map(country => <Picker.Item key={country._id} label={country.country} value={country._id} /> )}
                                </Picker>
                                
                                <FormInput autoCapitalize='none' 
                                placeholder='Phone/Mobile*' 
                                inputStyle={styles.formInput} 
                                onChangeText={(phone) => {this.setState({ phone });} } 
                                underlineColorAndroid='#052c52'
                                value={this.state.phone}
                                ref={(input) => { this.phoneInput = input; }} 
                                />
                                {!this.state.hasPhone ? <FormValidationMessage>{'Phone/Mobile is required'}</FormValidationMessage> : null } 
                                
                                <Button onPress={this._updateProfile}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Update Profile' />
                                <Button onPress={this._doSignOut}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Sign Out' />
                            </View>
                        </View>
                        { this.state.loading ?
                            
                            <View pointerEvents='none' style={styles.loading}>
                                <ActivityIndicator size="large" color="#052c52" />
                            </View>  

                        : null}
                    </ScrollView>
                </KeyboardAvoidingView>
                { this.state.screenLoading ?
                        
                    <View pointerEvents='none' style={styles.screenLoading}>
                        <ActivityIndicator size="large" color="#052c52" />
                    </View>  

                : null}
            </View>
            // <ScrollView contentContainerStyle={styles.contentContainer}>
            //     <Text>
            //         My account will be here.
            //     </Text>
            //     <Button onPress={this._doSignOut}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Sign Out' />
            // </ScrollView>
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
    contentContainer: {
        paddingVertical: 20
    },
    picker: { 
        width: 350, 
        marginLeft: 10 
    },
    checkboxContainer: {
        backgroundColor: 'transparent'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#f5fcff88'
    },
    screenLoading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    logo: {
        width: 150, 
        height: 150, 
        marginTop: 10,
        resizeMode:'contain'
    }
});