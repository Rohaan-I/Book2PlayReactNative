import React from 'react';
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, ActivityIndicator, Picker, Image, Alert } from 'react-native';
import { Card, Button, FormLabel, FormInput, CheckBox } from 'react-native-elements';


import Facility from '../services/Facility';

export default class FilterScreen extends React.Component {

    _facility = null;
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            city: '',
            country: '',
            screenLoading: false,
            cities: [],
            countries: [],
            selectedFacilities: [],
            selectedSports: '',
            sports: [],
            facilities: [],
            startPrice: '',
            endPrice: ''
        };

        this._facility = new Facility();
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
    }

    _filter = () => {

        let filterObject = {
            name: this.state.name,
            city: this.state.city,
            country: this.state.country,
            startPrice: this.state.startPrice,
            endPrice: this.state.endPrice,
            selectedSport: this.state.selectedSports,
            selectedFacilities: this.state.selectedFacilities
        };
        //const response = this._facility.filterFacility(reqObject);
        this.props.navigation.navigate('MyFacilities', {filterObject: filterObject});
    }

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
                                placeholder='Name' 
                                inputStyle={styles.formInput} 
                                onChangeText={(name) => {this.setState({ name });} } 
                                underlineColorAndroid='#052c52'
                                value={this.state.name} 
                                onSubmitEditing={() => { this.startPriceInput.focus(); }}
                                />
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
                                placeholder='Start Price' 
                                inputStyle={styles.formInput} 
                                underlineColorAndroid='#052c52'
                                onChangeText={(startPrice) => {this.setState({ startPrice });} }  
                                value={this.state.price} 
                                ref={(input) => { this.startPriceInput = input; }}
                                onSubmitEditing={() => { this.endPriceInput.focus(); }}
                                />
                                
                                <FormInput autoCapitalize='none' 
                                placeholder='End Price' 
                                inputStyle={styles.formInput} 
                                underlineColorAndroid='#052c52'
                                onChangeText={(endPrice) => {this.setState({ endPrice });} }  
                                value={this.state.price} 
                                ref={(input) => { this.endPriceInput = input; }}
                                />
                                
                                <FormLabel>Sport</FormLabel>
                                <Picker
                                    selectedValue={this.state.selectedSports}
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) => this.setState({selectedSports: itemValue})}>
                                    {this.state.sports.map(sport => <Picker.Item key={sport._id} label={sport.name} value={sport._id} /> )}
                                </Picker>
                                
                                <FormLabel>Facilities</FormLabel>
                                {this.state.facilities.map(facility => 
                                    <CheckBox
                                        containerStyle={styles.checkboxContainer}
                                        key={facility._id}
                                        title={facility.name}
                                        checked={facility.checked}
                                        checkedColor='#052c52'
                                        onPress={() => { 
                                            facility.checked = !facility.checked;

                                            if(facility.checked) {
                                                this.setState({
                                                    selectedFacilities: [...this.state.selectedFacilities, {id: facility._id}]
                                                });
                                            }
                                            else {
                                                this.setState({
                                                    selectedFacilities: this.state.selectedFacilities.filter(f => f.id === facility._id)
                                                });
                                            }
                                        }}
                                    />
                                )}

                                <Button onPress={this._filter}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Filter' />
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