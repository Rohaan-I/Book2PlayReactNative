import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Facility from '../services/Facility';

export default class MyFacilitiesScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                
                <Ionicons name='ios-add-circle' style={{marginRight: 15}} size={25} color='#000' onPress={() => navigation.navigate('AddFacility')} />
            )
        };
    };

    _facility = null;
    constructor(props) {
        super(props);
        this._facility = new Facility();
        this.state = {
            fields: [],
            screenLoading: true
        }
    }

    async componentDidMount() {
        this.setState({
            fields: await this._facility.getMyFields()
        });
        this.setState({
            screenLoading: false
        });
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
                                <Text style={{marginBottom: 10}}>
                                    <Text>
                                        {field.address.streetAddress}
                                    </Text>
                                    <Text>
                                        {field.address.poBox},{field.address.city.city}
                                    </Text>
                                    <Text>
                                        {field.address.country.country}
                                    </Text>
                                </Text>
                                <Text style={{marginBottom: 10}}>
                                    <Text>
                                        Sport
                                    </Text>
                                    <Text>
                                        {field.sport.name}
                                    </Text>
                                </Text>
                                <Text style={{marginBottom: 10}}>
                                    <Text>
                                        Facilities
                                    </Text>
                                    <Text>
                                        {field.facilities.map(fac => <Text>{fac.id.name}</Text> )}
                                    </Text>
                                </Text>
                                <Button
                                    backgroundColor='#efb225'
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='Details' />
                            </Card>);
                    })}
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
    }
});