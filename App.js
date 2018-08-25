import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AuthStack from './config/router';
// class SignInScreen extends React.Component {

//   render() {
//       return (
//           <View>
//               <Card>
//                   <FormLabel>Email*</FormLabel>
//                   <FormInput placeholder='Email Address' />
//                   <FormLabel>Password*</FormLabel>
//                   <FormInput secureTextEntry placeholder='Password' />
//                   <Button title='Sign In' />
//               </Card>
//           </View>
//       );
//   }
// }


export default class App extends React.Component {
  render() {
    return <AuthStack />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
