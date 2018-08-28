import React from 'react';
import { View, Text, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

export default class MyAccountScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    _doSignOut() {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        
        this.props.navigation.navigate('SignIn');
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text>
                    My account will be here.
                </Text>
                <Button onPress={this._doSignOut}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Sign Out' />
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