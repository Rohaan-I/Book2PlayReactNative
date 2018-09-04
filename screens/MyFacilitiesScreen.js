import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
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
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text>
                    My facilities list will be here.
                </Text>
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