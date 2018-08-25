import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
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
        else {
            this.setState({
                hasEmail: true
            });
        }
        if(this.state.password == '') {
            this.setState({
                hasPass: false
            })
        }   
        else {
            this.setState({
                hasPass: true
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Image
                    style={{width: 150, height: 150}}
                    source={require('../assets/images/logo_field.png')}
                /> */}
                <Card>
                    <FormInput placeholder='Email*' inputStyle={styles.formInput} onChangeText={(email) => {this.setState({ email });} } />
                    {!this.state.hasEmail ? <FormValidationMessage>{'Email is required'}</FormValidationMessage> : null } 
                    <FormInput secureTextEntry placeholder='Password*' inputStyle={styles.formInput} onChangeText={(password) => this.setState({password})} />
                    {!this.state.hasPass ? <FormValidationMessage>{'Password is required'}</FormValidationMessage> : null } 
                    <Button onPress={this._doSignIn}  buttonStyle={styles.button} color='#052c52' fontWeight='bold' title='Sign In' />
                    <Button buttonStyle={styles.signUpButton} fontWeight='bold' title='Register' onPress={() => this.props.navigation.navigate('SignUp') }/> 
                </Card>

                 {/* <View>
                    <Text style={{textDecorationLine: 'underline'}}>Terms</Text>
                    <Text style={{textDecorationLine: 'underline'}}>Privacy</Text>
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formInput: {
        paddingLeft: 5
    },
    button: {
        marginTop: 10,
        backgroundColor: '#efb225'
    },
    signUpButton: {
        marginTop: 10,
        backgroundColor: '#052c52'
    }
});