import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

import Booking from '../services/Booking';

export default class PreviousScreen extends React.Component {
    
    _booking = null;
    constructor(props) {
        super(props);
        this._booking = new Booking();

        this.state = {
            bookings: [],
            screenLoading: false,
            previousBookings: []
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
                
                let user = await AsyncStorage.getItem('user');
                this.setState({
                    user: JSON.parse(user)
                });

                //setting upcomming bookings
                let currDate = new Date();
                currDate = new Date( currDate.getTime() + Math.abs(currDate.getTimezoneOffset()*60000) );
                currDate = currDate.toISOString().split('T')[0];
                currDate = currDate.concat('T00:00:00.000Z')
                
                currDate = new Date(currDate).getTime();
                let previousBookings = [];

                let bookings = this.state.bookings;
                for(let i = 0; i < bookings.length; i++) {
                    let date = new Date(bookings[i].date);
                    date = date.getTime();

                    if(currDate > date && bookings[i].status.toLowerCase() != 'cancelled') {
                        previousBookings.push(bookings[i]);
                    }
                }

                this.setState({
                    previousBookings: previousBookings
                });

                this.setState({
                    screenLoading: false
                });
            }
        );
    }

    componentWillUnmount() {
        this._sub.remove();
    }

    _goToDetailsScreen = (booking) => {
        this.props.navigation.navigate('BookingDetails', {
            booking: booking, 
            title: booking.field.title,
            user: this.state.user});
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.previousBookings.length == 0 
                    ?
                    <View style={styles.bookingMessage}>
                        <Text style={styles.bookingMessageColor}> No previous bookings found </Text>
                    </View>
                    :
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                    {this.state.previousBookings.map(booking => {
                            
                        return (<Card
                            key={booking._id}
                            title={booking.field.title}
                            image={require('../assets/images/logo_field.png')}>
                                <Text style={styles.firstHeading}>
                                    Date
                                </Text>
                                <Text>
                                    {new Date(booking.date).toDateString()}
                                </Text>
                                <Text style={styles.heading}>
                                    Time Slots
                                </Text>
                                <View>
                                    {booking.selectedTimeRanges.map(str => {
                                        return (<Text key={str.id}>
                                            {str.startHour + ':00'} {str.startPhase.toUpperCase()} - {str.endHour + ':00'} {str.endPhase.toUpperCase()}
                                        </Text>);
                                    })} 
                                </View>
                                <Text style={styles.heading}>
                                    Charges
                                </Text>
                                <Text>
                                    AED {booking.totalCharges}
                                </Text>
                                {this.state.user.role.toLowerCase() == 'field manager'
                                    ?
                                    <View>
                                        <Text style={styles.heading}>
                                            Customer
                                        </Text>
                                        <Text>
                                            {booking.bookedByUser.name}
                                        </Text>
                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.heading}>
                                            Field Manager
                                        </Text>
                                        <Text>
                                            {booking.fieldManager.name}
                                        </Text>
                                    </View>
                                }
                                <Text style={styles.heading}>
                                    Contact Number
                                </Text>
                                {this.state.user.role.toLowerCase() == 'field manager'
                                    ?
                                    <Text>
                                        {booking.bookedByUser.contactNumber}
                                    </Text>
                                    :
                                    <Text>
                                        {booking.fieldManager.contactNumber}
                                    </Text>
                                }
                                <View>
                                    <Button
                                        backgroundColor='#efb225'
                                        buttonStyle={styles.detailsBtn}
                                        containerViewStyle={{width: '100%', marginLeft: 0}}
                                        title='Details' 
                                        onPress={() => this._goToDetailsScreen(booking)}
                                        />
                                </View>
                            </Card>);
                        })}
                    </ScrollView>
                }
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
        paddingVertical: 5
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
    },
    firstHeading: {
        fontSize: 16, 
        color: '#052c52', 
        fontWeight: 'bold'
    },
    heading: {
        marginTop: 10, 
        fontSize: 16, 
        color: '#052c52', 
        fontWeight: 'bold'
    },
    chipsContainer: {
        marginBottom: 10, 
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    detailsBtn: {
        borderRadius: 0, 
        marginLeft: 0, 
        marginRight: 0, 
        marginBottom: 0,
        marginTop: 10
    },
    bookingMessage: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    bookingMessageColor: {
        color: '#052c52'
    }
});