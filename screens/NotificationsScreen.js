import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

export default class NotificationsScreen extends React.Component {

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text>
                    Notifications list will be here.
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