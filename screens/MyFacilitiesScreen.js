import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Facility from '../services/Facility';
import FAB from 'react-native-fab';

export default class MyFacilitiesScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                
                <Ionicons name='ios-funnel' style={{marginRight: 15}} size={25} color='#000' onPress={() => navigation.navigate('Filters')} />
            )
        };
    };

    _facility = null;
    _sub = null;
    constructor(props) {
        super(props);
        this._facility = new Facility();
        this.state = {
            fields: [],
            screenLoading: false
        }
    }
    
    componentDidMount() {
        this._sub = this.props.navigation.addListener(
            'willFocus',
            async payload => {
                this.setState({
                    screenLoading: true
                });      
                this.setState({
                    fields: await this._facility.getMyFields()
                });
                this.setState({
                    screenLoading: false
                });
            }
        );
    }

    componentWillUnmount() {
        this._sub.remove();
    }

    _goToDetailsScreen = (field) => {
        this.props.navigation.navigate('FacilityDetails', {fieldId: field._id, title: field.title});
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {this.state.fields.map(field => {
                        
                        return (<Card
                            key={field._id}
                            title={field.title}
                            image={require('../assets/images/logo_field.png')}>
                                <Text style={styles.firstHeading}>
                                    {field.address.streetAddress}
                                </Text>
                                <Text>
                                    {field.address.poBox},{field.address.city.city}
                                </Text>
                                <Text>
                                    {field.address.country.country}
                                </Text>
                                <Text style={styles.heading}>
                                    Size
                                </Text>
                                <Text>
                                    {field.fieldSize.width} X {field.fieldSize.length} 
                                </Text>
                                <Text style={styles.heading}>
                                    Price
                                </Text>
                                <Text>
                                    AED {field.price} / hr
                                </Text>
                                <Text style={styles.heading}>
                                    Sport
                                </Text>
                                <Text>
                                    {field.sport.name}
                                </Text>
                                <Text style={styles.heading}>
                                    Facilities
                                </Text>
                                <View style={styles.chipsContainer}>
                                    {field.facilities.map(fac => 
                                        <Text 
                                            key={fac._id} 
                                            style={styles.chip}>
                                            
                                            {fac.id.name}
                                        </Text>
                                    )}
                                </View>
                                <View>
                                    <Button
                                        backgroundColor='#efb225'
                                        buttonStyle={styles.detailsBtn}
                                        containerViewStyle={{width: '100%', marginLeft: 0}}
                                        title='Details' 
                                        onPress={() => this._goToDetailsScreen(field)}
                                        />
                                </View>
                            </Card>);
                    })}
                </ScrollView>
                { this.state.screenLoading ?
                    
                    <View pointerEvents='none' style={styles.screenLoading}>
                        <ActivityIndicator size="large" color="#052c52" />
                    </View>  

                : null}
                <FAB buttonColor="#052c52" iconTextColor="#FFFFFF" onClickAction={() => { this.props.navigation.navigate('AddFacility'); }} visible={true} iconTextComponent={    <Ionicons name='ios-add' style={{marginRight: 15}} size={25} />} />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        paddingVertical: 5
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
    firstHeading: {
        fontSize: 16, 
        color: '#052c52', 
        fontWeight: 'bold'
    },
    heading: {
        marginTop: 10, 
        fontSize: 16, 
        color: '#052c52', 
        fontWeight: 'bold'
    },
    chipsContainer: {
        marginBottom: 10, 
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    detailsBtn: {
        borderRadius: 0, 
        marginLeft: 0, 
        marginRight: 0, 
        marginBottom: 0
    },
    chip: {
        marginTop: 5, 
        marginRight: 5, 
        borderRadius: 40, 
        backgroundColor: '#dedede', 
        padding: 8
    }
});