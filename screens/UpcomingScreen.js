import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

import Booking from '../services/Booking';

export default class UpcomingScreen extends React.Component {
    
    _booking = null;
    constructor(props) {
        super(props);
        this._booking = new Booking();

        this.state = {
            bookings: [],
            screenLoading: false,
            upcomingBookings: []
        }
    }

    componentDidMount() {
        this._sub = this.props.navigation.addListener(
            'didFocus',
            async payload => {
                this.setState({
                    screenLoading: true
                });
                
                let result = await this._booking.getFieldAllBookings();
                this.setState({
                    bookings: result.bookings
                });

                //setting upcomming bookings
                let currDate = new Date();
                currDate = new Date( currDate.getTime() + Math.abs(currDate.getTimezoneOffset()*60000) );
                currDate = currDate.toISOString().split('T')[0];
                currDate = currDate.concat('T00:00:00.000Z')
                
                currDate = new Date(currDate).getTime();
                let upcomingBookings = [];

                let bookings = this.state.bookings;
                for(let i = 0; i < bookings.length; i++) {
                    let date = new Date(bookings[i].date);
                    date = date.getTime();

                    if(currDate < date) {
                        upcomingBookings.push(bookings[i]);
                    }
                }

                this.setState({
                    upcomingBookings: upcomingBookings
                });

                console.log('upcoming bookings ===============================>>');
                console.log(this.state.upcomingBookings);
        
                this.setState({
                    screenLoading: false
                });
            }
        );
    }

    componentWillUnmount() {
        this._sub.remove();
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text>
                        Upcoming Bookings
                    </Text>
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
        paddingVertical: 20,
        paddingHorizontal: 20,
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
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