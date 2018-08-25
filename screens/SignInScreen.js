import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class SignInScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            hasEmail: true,
            hasPass: true
        };
    }

    _doSignIn = () => {
        if(this.state.email == '') {
            this.setState({
                hasEmail: false
            })
        } 
        if(this.state.password == '') {
            this.setState({
                hasEmail: false
            })
        }   
    }

    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <FormInput placeholder='Email*' inputStyle={styles.formInput} onChangeText={(email) => {this.setState({email}); console.log(this.state.email); } } />
                    {!this.state.hasEmail ? <FormValidationMessage>{'Email is required'}</FormValidationMessage> : null } 
                    <FormInput secureTextEntry placeholder='Password*' inputStyle={styles.formInput} onChangeText={(password) => this.setState({password})} />
                    {!this.state.hasPass ? <FormValidationMessage>{'Password is required'}</FormValidationMessage> : null } 
                    <Button onPress={this._doSignIn}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Sign In' />
                    <Button buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Sign Up' onPress={() => this.props.navigation.navigate('SignUp') }/> 
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    formInput: {
        paddingLeft: 5
    },
    button: {
        marginTop: 10,
        backgroundColor: '#efb225'
    }
});