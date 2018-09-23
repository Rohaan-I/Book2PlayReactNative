import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

export default class FilterScreen extends React.Component {

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
            sports: [],
            facilities: [],
            price: ''
        };
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

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <FormInput autoCapitalize='none' 
                placeholder='Name' 
                inputStyle={styles.formInput} 
                onChangeText={(name) => {this.setState({ name });} } 
                value={this.state.fullName} 
                onSubmitEditing={() => { this.emailInput.focus(); }}
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
                placeholder='Phone/Mobile*' 
                inputStyle={styles.formInput} 
                onChangeText={(phone) => {this.setState({ phone });} }  
                value={this.state.phone} 
                ref={(input) => { this.phoneInput = input; }}
                />
                {!this.state.hasPhone ? <FormValidationMessage>{'Phone/Mobile is required'}</FormValidationMessage> : null } 
                
                <FormLabel>Role*</FormLabel>
                <Picker
                    selectedValue={this.state.userRole}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => this.setState({userRole: itemValue})}>
                    <Picker.Item label="List my field" value="1" />
                    <Picker.Item label="Reserve a field" value="2" />
                </Picker>

                <Button onPress={this._doSignUp}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Create An Account' />
                <Button buttonStyle={styles.signInButton} fontWeight='bold' title='Sign In' onPress={() => this.props.navigation.navigate('SignIn') }/> 
                
                <Text style={styles.terms}>By creating an account, you accept and agree to our <Text style={{textDecorationLine: 'underline'}} onPress={this._goToTermsScreen}>Terms of Use</Text></Text>
            
                { this.state.loading ?
                    
                    <View pointerEvents='none' style={styles.loading}>
                        <ActivityIndicator size="large" color="#052c52" />
                    </View>  

                : null}
    
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});