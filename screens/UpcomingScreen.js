import React from 'react';
import { View, Text, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

export default class UpcomingScreen extends React.Component {
    
    

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text>
                    Upcoming Bookings
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
    },
    button: {
        marginTop: 10,
        backgroundColor: '#efb225'
    }
});