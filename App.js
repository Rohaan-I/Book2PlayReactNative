import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PublicRootTabScreen from './config/router';

export default class App extends React.Component {
  render() {
    return <PublicRootTabScreen />
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
