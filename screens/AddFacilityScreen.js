import React from 'react';
import { View, StyleSheet, Text, Image, Alert, ActivityIndicator, Keyboard, Picker, ScrollView, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput, FormValidationMessage, CheckBox } from 'react-native-elements';

import Facility from '../services/Facility';

export default class AddFacilityScreen extends React.Component {

    _facility = null;
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            streetAddress: '',
            poBox: '',
            city: '',
            country: '',
            phone: '',
            width: '',
            length: '',
            openHour: 1,
            closeHour: 1,
            price: '',
            selectedSports: '',
            selectedFacilities: [],
            description: '',
            hasTitle: true,
            hasStreetAddress: true,
            hasPhone: true,
            hasWidth: true,
            hasLength: true,
            hasPrice: true,
            hasSelectedFacilities: true,
            hasDescription: true,
            loading: false,
            screenLoading: false,
            cities: [],
            countries: [],
            sports: [],
            facilities: [],
            hours: [
                {
                    id: 1,
                    hour: 12,
                    phase: 'am'
                },
                {
                    id: 2,
                    hour: 1,
                    phase: 'am'
                },
                {
                    id: 3,
                    hour: 2,
                    phase: 'am'
                },
                {
                    id: 4,
                    hour: 3,
                    phase: 'am'
                },
                {
                    id: 5,
                    hour: 4,
                    phase: 'am'
                },
                {
                    id: 6,
                    hour: 5,
                    phase: 'am'
                },
                {
                    id: 7,
                    hour: 6,
                    phase: 'am'
                },
                {
                    id: 8,
                    hour: 7,
                    phase: 'am'
                },
                {
                    id: 9,
                    hour: 8,
                    phase: 'am'
                },
                {
                    id: 10,
                    hour: 9,
                    phase: 'am'
                },
                {
                    id: 11,
                    hour: 10,
                    phase: 'am'
                },
                {
                    id: 12,
                    hour: 11,
                    phase: 'am'
                },
                {
                    id: 13,
                    hour: 12,
                    phase: 'pm'
                },
                {
                    id: 14,
                    hour: 1,
                    phase: 'pm'
                },
                {
                    id: 15,
                    hour: 2,
                    phase: 'pm'
                },
                {
                    id: 16,
                    hour: 3,
                    phase: 'pm'
                },
                {
                    id: 17,
                    hour: 4,
                    phase: 'pm'
                },
                {
                    id: 18,
                    hour: 5,
                    phase: 'pm'
                },
                {
                    id: 19,
                    hour: 6,
                    phase: 'pm'
                },
                {
                    id: 20,
                    hour: 7,
                    phase: 'pm'
                },
                {
                    id: 21,
                    hour: 8,
                    phase: 'pm'
                },
                {
                    id: 22,
                    hour: 9,
                    phase: 'pm'
                },
                {
                    id: 23,
                    hour: 10,
                    phase: 'pm'
                },
                {
                    id: 24,
                    hour: 11,
                    phase: 'pm'
                }
            ]
        };

        this._facility = new Facility();
    }

    componentDidMount() {

        // if(AsyncStorage.getItem('cities') && AsyncStorage.getItem('countries')) {
        //     this.setState({
        //         cities: AsyncStorage.getItem('cities')
        //     });
        //     this.setState({
        //         countries: AsyncStorage.getItem('countries')
        //     });
        // } 
        // else {
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
    
                //AsyncStorage.setItem('cities', cities);
                
                return this._facility.getCountries();
            })
            .then(countries => {
                this.setState({
                    countries: countries
                });
                this.setState({
                    country: countries[0]._id
                });
                
                //AsyncStorage.setItem('countries', countries);

                return this._facility.getSports();
            
            })
            .then(sports => {
                this.setState({
                    sports: sports
                });
                this.setState({
                    selectedSports: sports[0]._id
                });
                
                //AsyncStorage.setItem('countries', countries);
                
                return this._facility.getFacilities();
            })
            .then(facilities => {

                facilities.forEach(facility => {
                    facility.checked = false
                });
                
                this.setState({
                    facilities: facilities
                });
                

                this.setState({
                    selectedSports: this.state.sports[0]._id
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
        // }
        
    }

    _doAddField = async () => {
        
        try {
            if(this.state.title == '') {
                this.setState({
                    hasTitle: false
                })
            } 
            else {
                this.setState({
                    hasTitle: true
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
            if(this.state.width == '') {
                this.setState({
                    hasWidth: false
                })
            } 
            else {
                this.setState({
                    hasWidth: true
                });
            }
            if(this.state.length == '') {
                this.setState({
                    hasLength: false
                })
            } 
            else {
                this.setState({
                    hasLength: true
                });
            }
            if(this.state.price == '') {
                this.setState({
                    hasPrice: false
                });
            } 
            else {
                this.setState({
                    hasPrice: true
                });
            }
            if(this.state.selectedFacilities.length == 0) {
                this.setState({
                    hasSelectedFacilities: false
                })
            } 
            else {
                this.setState({
                    hasSelectedFacilities: true
                });
            }
            if(this.state.description == '') {
                this.setState({
                    hasDescription: false
                })
            } 
            else {
                this.setState({
                    hasDescription: true
                });
            }


            if(this.state.title && this.state.streetAddress
                && this.state.city && this.state.country && this.state.phone
                && this.state.width && this.state.length && this.state.price 
                && this.state.selectedFacilities.length !== 0 && this.state.description) {

                Keyboard.dismiss();
                this.setState({
                    loading: true
                });

                let user = await AsyncStorage.getItem('user');
                user = JSON.parse(user);
                console.log(user);

                let reqObject = {
                    title: this.state.title.trim(),
                    address: {
                        streetAddress: this.state.streetAddress.trim(),
                        poBox: this.state.poBox.trim(),
                        city: this.state.city,
                        country: this.state.country
                    },
                    contactNumber: this.state.phone.trim(),
                    fieldSize: {
                        width: this.state.width,
                        length: this.state.length
                    },
                    facilities: this.state.selectedFacilities,
                    sport: this.state.selectedSports,
                    price: this.state.price,
                    description: this.state.description,
                    fieldManager: user.id,
                    location: {
                        lat: 25.1041958,
                        lng: 55.163236
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [
                            25.1041958,
                            55.163236
                        ]
                    },
                    startingHourLimit: this.state.hours[this.state.hours.findIndex(hour => hour.id ===  this.state.openHour)],
                    endingHourLimit: this.state.hours[this.state.hours.findIndex(hour => hour.id ===  this.state.closeHour)]
                }
                
                let response = await this._facility.addField(reqObject);
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

                    this.setState({
                        title: ''
                    });
                
                    this.setState({
                        streetAddress: ''
                    });
                
                    this.setState({
                        phone: ''
                    });
                    
                    this.setState({
                        width: ''
                    });
                    
                    this.setState({
                        length: ''
                    });
                    
                    this.setState({
                        price: ''
                    });
                
                    this.setState({
                        selectedFacilities: []
                    });
                
                    this.setState({
                        description: ''
                    });

                    this.setState({
                        city: ''
                    });
                    
                    this.setState({
                        country: ''
                    });

                    this.setState({
                        openHour: 1
                    });

                    this.setState({
                        closeHour: 1
                    });

                    this.setState({
                        selectedSports: this.state.sports[0]._id
                    });

                    this.state.facilities.forEach(facility => {
                        facility.checked = false;
                    });

                    this.setState({
                        poBox: ''
                    });

                    this.props.navigation.navigate('MyFacilities');
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

    onSelectedFacilitiesChange = selectedFacilities => {
        this.setState({ selectedFacilities });
    }

    render() {            
        return (
            <View>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.container}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/images/logo_field.png')}
                        />
                        <View>
                            <FormInput autoCapitalize='none' placeholder='Title of Field*' inputStyle={styles.formInput} onChangeText={(title) => {this.setState({ title });} } value={this.state.title} />
                            {!this.state.hasTitle ? <FormValidationMessage>{'Title of Field is required'}</FormValidationMessage> : null } 
                            <FormInput autoCapitalize='none' placeholder='Street Address*' inputStyle={styles.formInput} onChangeText={(streetAddress) => {this.setState({ streetAddress });} } value={this.state.streetAddress} />
                            {!this.state.hasStreetAddress ? <FormValidationMessage>{'Street Address is required'}</FormValidationMessage> : null } 
                            <FormInput autoCapitalize='none' placeholder='P.O. Box' inputStyle={styles.formInput} onChangeText={(poBox) => {this.setState({ poBox });} } value={this.state.poBox} />
                            
                            <FormLabel>City*</FormLabel>  
                            <Picker
                                selectedValue={this.state.city}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}>
                                {this.state.cities.map(city => <Picker.Item key={city._id} label={city.city} value={city._id} /> )}
                            </Picker>
                            
                            <FormLabel>Country*</FormLabel>  
                            <Picker
                                selectedValue={this.state.country}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
                                {this.state.countries.map(country => <Picker.Item key={country._id} label={country.country} value={country._id} /> )}
                            </Picker>
                            
                            <FormInput autoCapitalize='none' placeholder='Contact Number*' inputStyle={styles.formInput} onChangeText={(phone) => {this.setState({ phone });} }  value={this.state.phone} />
                            {!this.state.hasPhone ? <FormValidationMessage>{'Contact Number is required'}</FormValidationMessage> : null } 
                            
                            <FormInput autoCapitalize='none' placeholder='Width of Field in Sq m*' inputStyle={styles.formInput} onChangeText={(width) => {this.setState({ width });} }  value={this.state.width} />
                            {!this.state.hasWidth ? <FormValidationMessage>{'Width of Field is required'}</FormValidationMessage> : null } 
                            
                            <FormInput autoCapitalize='none' placeholder='Length of Field in Sq m*' inputStyle={styles.formInput} onChangeText={(length) => {this.setState({ length });} }  value={this.state.length} />
                            {!this.state.hasLength ? <FormValidationMessage>{'Length of Field is required'}</FormValidationMessage> : null } 
                            
                            <FormLabel>Opening Hour*</FormLabel>
                            <Picker
                                selectedValue={this.state.openHour}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({openHour: itemValue})}>
                                {this.state.hours.map(hour => <Picker.Item key={hour.id} label={hour.hour + ' ' + hour.phase} value={hour.id} /> )}
                            </Picker>
                            
                            <FormLabel>Closing Hour*</FormLabel>
                            <Picker
                                selectedValue={this.state.closeHour}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({closeHour: itemValue})}>
                                {this.state.hours.map(hour => <Picker.Item key={hour.id} label={hour.hour + ' ' + hour.phase} value={hour.id} /> )}
                            </Picker>
                            
                            <FormInput autoCapitalize='none' placeholder='Price*' inputStyle={styles.formInput} onChangeText={(price) => {this.setState({ price });} }  value={this.state.price} />
                            {!this.state.hasLength ? <FormValidationMessage>{'Price is required'}</FormValidationMessage> : null } 
                            
                            <FormLabel>Sport*</FormLabel>
                            <Picker
                                selectedValue={this.state.selectedSports}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({selectedSports: itemValue})}>
                                {this.state.sports.map(sport => <Picker.Item key={sport._id} label={sport.name} value={sport._id} /> )}
                            </Picker>
                            
                            <FormLabel>Facilities*</FormLabel>
                            {this.state.facilities.map(facility => 
                                <CheckBox
                                    containerStyle={styles.checkboxContainer}
                                    key={facility._id}
                                    title={facility.name}
                                    checked={facility.checked}
                                    onPress={() => { 
                                        facility.checked = !facility.checked;

                                        if(facility.checked) {
                                            this.setState({
                                                selectedFacilities: [...this.state.selectedFacilities, facility]
                                            });
                                        }
                                        else {
                                            this.setState({
                                                selectedFacilities: this.state.selectedFacilities.filter(f => f._id === facility._id)
                                            });
                                        }
                                    }}
                                />
                            )}
                            {!this.state.hasSelectedFacilities ? <FormValidationMessage>{'Facilities are required'}</FormValidationMessage> : null } 
                            
                            
                            <FormInput  multiline={true} numberOfLines={4} autoCapitalize='none' placeholder='Description*' inputStyle={styles.formInput} onChangeText={(description) => {this.setState({ description });} }  value={this.state.description} />
                            {!this.state.hasDescription ? <FormValidationMessage>{'Description is required'}</FormValidationMessage> : null } 
                        
                            <Button onPress={this._doAddField}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Add Field' />
                            
                        </View>
                        { this.state.loading ?
                            
                            <View pointerEvents='none' style={styles.loading}>
                                <ActivityIndicator size="large" color="#052c52" />
                            </View>  

                        : null}

                        
                    </View>
                    
                </ScrollView>
                { this.state.screenLoading ?
                    
                    <View pointerEvents='none' style={styles.screenLoading}>
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
    terms: { 
        marginLeft: 15, 
        marginTop: 10 
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
    }
});