import React from 'react';
import { View } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

export default class SignUpScreen extends React.Component {

    render() {
        return (
            <View>
                <Card>
                    {/* <FormLabel>Email*</FormLabel>
                    <FormInput placeholder='Email Address' />
                    <FormLabel>Password*</FormLabel>
                    <FormInput secureTextEntry placeholder='Password' />*/}
                    <Button title='Sign Up' />
                </Card>
            </View>
        );
    }
}