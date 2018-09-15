import React from 'react';
import { View, Text, ScrollView, StyleSheet, 
    Image, ActivityIndicator, AsyncStorage, KeyboardAvoidingView, Alert } from 'react-native';
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Facility from '../services/Facility';
import Booking from '../services/Booking';

export default class BookingDetailsScreen extends React.Component {
    
    _booking = null;
    
    constructor(props) {
        super(props);
        // this._facility = new Facility();
        this._booking = new Booking();
        
        this.state = {
            loading: false,
            rejectionReason: '',
            hasRejectionReason: true,
            cancellationReason: '',
            hasCancellationReason: true
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title')
        }
    };

    _acceptBooking = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        
        this.setState({
            loading: true
        });

        let reqObject = {
            id: this.props.navigation.getParam('booking')._id,
            status: 'accepted',
            statusUpdateComments: 'Booking request is accepted.',
            statusUpdatedBy: user.id
        };

        console.log(reqObject);

        let response = await this._booking.updateBookingStatus(reqObject);
        console.log(response);

        if(!response.success) {
            this.setState({
                loading: false
            });

            Alert.alert(
                'Error',
                response.message,
                [
                  {text: 'OK'}
                ],
                { cancelable: false }
              );
        }
        else {
            response = await this._booking.updateBooking(this.props.navigation.getParam('booking')._id);
            console.log(response);

            this.setState({
                loading: false
            });
            
            if(!response.success) {
                
                Alert.alert(
                    'Error',
                    response.message,
                    [
                      {text: 'OK'}
                    ],
                    { cancelable: false }
                  );
            }
            else {
                this.props.navigation.navigate('Bookings');
            }
        }
    }

    _rejectBooking = async () => {


        if(this.state.rejectionReason == '') {
            this.setState({
                hasRejectionReason: false
            });
        }
        else {

            let booking  = this.props.navigation.getParam('booking');
            let d1 = new Date(booking.date);
            let d2 = new Date();

            var diff = d1.valueOf() - d2.valueOf();
            var diffInHours = diff/1000/60/60; 

            if(diffInHours <= 48) {
                Alert.alert(
                    'Error',
                    'You can only cancel 48 hours prior to booking date.',
                    [
                    {text: 'OK'}
                    ],
                    { cancelable: false }
                );
            }
            else {
                let user = await AsyncStorage.getItem('user');
                user = JSON.parse(user);
                
                this.setState({
                    loading: true
                });

                let reqObject = {
                    id: this.props.navigation.getParam('booking')._id,
                    status: 'rejected',
                    statusUpdateComments: this.state.rejectionReason,
                    statusUpdatedBy: user.id
                };

                console.log(reqObject);

                let response = await this._booking.updateBookingStatus(reqObject);
                console.log(response);

                if(!response.success) {
                    this.setState({
                        loading: false
                    });

                    Alert.alert(
                        'Error',
                        response.message,
                        [
                        {text: 'OK'}
                        ],
                        { cancelable: false }
                    );
                }
                else {
                    response = await this._booking.updateBooking(this.props.navigation.getParam('booking')._id);
                    console.log(response);

                    this.setState({
                        loading: false
                    });
                    
                    if(!response.success) {
                        
                        Alert.alert(
                            'Error',
                            response.message,
                            [
                            {text: 'OK'}
                            ],
                            { cancelable: false }
                        );
                    }
                    else {
                        this.props.navigation.navigate('Bookings');
                    }
                }
            }
        }
        
    }

    _cancelBooking = async () => {


        if(this.state.cancellationReason == '') {
            this.setState({
                hasCancellationReason: false
            });
        }
        else {


            let booking  = this.props.navigation.getParam('booking');
            let d1 = new Date(booking.date);
            let d2 = new Date();

            var diff = d1.valueOf() - d2.valueOf();
            var diffInHours = diff/1000/60/60; 

            if(diffInHours <= 48) {
                Alert.alert(
                    'Error',
                    'You can only cancel 48 hours prior to booking date.',
                    [
                    {text: 'OK'}
                    ],
                    { cancelable: false }
                );
            }
            else {
                let user = await AsyncStorage.getItem('user');
                user = JSON.parse(user);
                
                this.setState({
                    loading: true
                });

                let reqObject = {
                    id: this.props.navigation.getParam('booking')._id,
                    status: 'cancelled',
                    statusUpdateComments: this.state.cancellationReason,
                    statusUpdatedBy: user.id
                };

                console.log(reqObject);

                let response = await this._booking.updateBookingStatus(reqObject);
                console.log(response);

                if(!response.success) {
                    this.setState({
                        loading: false
                    });

                    Alert.alert(
                        'Error',
                        response.message,
                        [
                        {text: 'OK'}
                        ],
                        { cancelable: false }
                    );
                }
                else {
                    response = await this._booking.updateBooking(this.props.navigation.getParam('booking')._id);
                    console.log(response);

                    this.setState({
                        loading: false
                    });
                    
                    if(!response.success) {
                        
                        Alert.alert(
                            'Error',
                            response.message,
                            [
                            {text: 'OK'}
                            ],
                            { cancelable: false }
                        );
                    }
                    else {
                        this.props.navigation.navigate('Bookings');
                    }
                }
            }
        }
        
    }

    render() {
        const booking  = this.props.navigation.getParam('booking');
        const user  = this.props.navigation.getParam('user');
        
        
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView 
                behavior='padding'
                keyboardVerticalOffset={100}>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <Image
                        style={{resizeMode:'contain', width: 300, height: 150}}
                        source={require('../assets/images/logo_field.png')}
                        />
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
                        {user.role.toLowerCase() == 'field manager'
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
                        {user.role.toLowerCase() == 'field manager'
                            ?
                            <Text>
                                {booking.bookedByUser.contactNumber}
                            </Text>
                            :
                            <Text>
                                {booking.fieldManager.contactNumber}
                            </Text>
                        }
                        <Text style={styles.heading}>
                            Email
                        </Text>
                        
                        {user.role.toLowerCase() == 'field manager'
                            ?
                            <Text>
                                {booking.bookedByUser.email}
                            </Text>
                            :
                            <Text>
                                {booking.fieldManager.email}
                            </Text>
                        }
                        <Text style={styles.heading}>
                            Status
                        </Text>
                        {booking.status.toLowerCase() == 'rejected' ?
                            <Text style={styles.rejectedStatus}>
                                {booking.status}
                            </Text>
                        :null}
                        {booking.status.toLowerCase() == 'cancelled' ?
                            <Text style={styles.rejectedStatus}>
                                {booking.status}
                            </Text>
                        :null}
                        {booking.status.toLowerCase() == 'approved' ?
                            <Text style={styles.approvedStatus}>
                                {booking.status}
                            </Text>
                        :null}
                        {booking.status.toLowerCase() == 'pending' ?
                            <Text style={styles.approvedStatus}>
                                {booking.status}
                            </Text>
                        :null}
                        {booking.status.toLowerCase() == 'accepted' ?
                            <Text style={styles.acceptedStatus}>
                                {booking.status}
                            </Text>
                        :null}

                        {user.role.toLowerCase() == 'field manager'
                        ?
                        <View>
                            {booking.status.toLowerCase() == 'approved' ? 
                            <Button
                                disabled={true}
                                backgroundColor='#efb225'
                                fontWeight='bold'
                                color='#ffffff'
                                buttonStyle={styles.button}
                                containerViewStyle={{width: '100%', marginLeft: 0}}
                                title='Approved' 
                                onPress={this._acceptBooking}
                                />
                            :null}

                            {booking.status.toLowerCase() == 'pending' ? 
                            <Button
                                disabled={false}
                                backgroundColor='#efb225'
                                fontWeight='bold'
                                color='#052c52'
                                buttonStyle={styles.button}
                                containerViewStyle={{width: '100%', marginLeft: 0}}
                                title='Accept Booking' 
                                onPress={this._acceptBooking}
                                />
                            :null}
                            {booking.status.toLowerCase() == 'rejected' ? 
                            <Button
                                disabled={true}
                                backgroundColor='#efb225'
                                fontWeight='bold'
                                color='#ffffff'
                                buttonStyle={styles.button}
                                containerViewStyle={{width: '100%', marginLeft: 0}}
                                title='Accept Booking' 
                                onPress={this._acceptBooking}
                                />
                            :null}
                        </View>
                        :null}
                        
                        {user.role.toLowerCase() == 'field manager'
                            ?
                            <View>   
                                {booking.status.toLowerCase() != 'rejected' ? 
                                    <View>
                                        <FormInput  
                                            multiline={true} 
                                            numberOfLines={4}
                                            autoCapitalize='none' 
                                            placeholder='Rejection reason*' 
                                            inputStyle={styles.formInput}
                                            onChangeText={(rejectionReason) => {this.setState({ rejectionReason });} }  
                                            value={this.state.rejectionReason} 
                                            //ref={(input) => { this.descInput = input; }}
                                        />
                                        {!this.state.hasRejectionReason ? <FormValidationMessage>{'Rejection reason is required'}</FormValidationMessage> : null } 
                                    </View> 
                                :null}
                            </View>
                            :
                            <View>
                                {booking.status.toLowerCase() != 'cancelled' 
                                    ?
                                    <View>
                                        <FormInput  
                                            multiline={true} 
                                            numberOfLines={4}
                                            autoCapitalize='none' 
                                            placeholder='Cancellation reason*' 
                                            inputStyle={styles.formInput}
                                            onChangeText={(cancellationReason) => {this.setState({ cancellationReason });} }  
                                            value={this.state.cancellationReason} 
                                            //ref={(input) => { this.descInput = input; }}
                                        />
                                        {!this.state.hasCancellationReason ? <FormValidationMessage>{'Cancellation reason is required'}</FormValidationMessage> : null } 
                                    </View>
                                    :null
                                }
                            </View> 
                        }
                        
                        {user.role.toLowerCase() == 'field manager'
                            ?
                            <View>
                                {booking.status.toLowerCase() != 'rejected' ?
                                    <Button
                                        disabled={false}
                                        backgroundColor='#cc0000'
                                        fontWeight='bold'
                                        color='#ffffff'
                                        buttonStyle={styles.rejectButton}
                                        containerViewStyle={{width: '100%', marginLeft: 0}}
                                        title='Reject Booking'
                                        onPress={this._rejectBooking}
                                        />
                                    :
                                    <Button
                                        disabled={true}
                                        backgroundColor='#cc0000'
                                        fontWeight='bold'
                                        color='#ffffff'
                                        buttonStyle={styles.rejectButton}
                                        containerViewStyle={{width: '100%', marginLeft: 0}}
                                        title='Reject Booking'
                                        onPress={this._rejectBooking}
                                        />
                                }
                            </View>
                            : 
                            <View>
                                {booking.status.toLowerCase() != 'cancelled' 
                                ?
                                <Button
                                    disabled={false}
                                    backgroundColor='#cc0000'
                                    fontWeight='bold'
                                    color='#ffffff'
                                    buttonStyle={styles.rejectButton}
                                    containerViewStyle={{width: '100%', marginLeft: 0}}
                                    title='Cancel Booking'
                                    onPress={this._cancelBooking}
                                    />
                                :
                                <Button
                                    disabled={true}
                                    backgroundColor='#cc0000'
                                    fontWeight='bold'
                                    color='#ffffff'
                                    buttonStyle={styles.rejectButton}
                                    containerViewStyle={{width: '100%', marginLeft: 0}}
                                    title='Cancel Booking'
                                    onPress={this._cancelBooking}
                                    />
                                }
                            </View>
                        }
                        
                        
                        { this.state.loading ?
                            <View pointerEvents='none' style={styles.loading}>
                                <ActivityIndicator size="large" color="#052c52" />
                            </View>  

                        : null}
                    </ScrollView>
                </KeyboardAvoidingView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        //paddingVertical: 20,
        paddingHorizontal: 20,
        //flex: 1, 
        //alignItems: 'flex-start'
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
        marginTop: 10,
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
    chip: {
        marginTop: 5, 
        marginRight: 5, 
        borderRadius: 40, 
        backgroundColor: '#dedede', 
        padding: 8,
        height: 37
    },
    button: {
        marginTop: 10
    },
    clickedBtn: {
        marginTop: 10,
        backgroundColor: '#efb225'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#f5fcff88'
    },
    formInput: {
        paddingLeft: 5,
        color: '#052c52'
    },
    rejectButton: {
        marginTop: 10,
        marginBottom: 10
    },
    approvedStatus: {
        fontWeight: 'bold',
        color: '#ffc53f'
    },
    rejectedStatus: {
        fontWeight: 'bold',
        color: '#cc0000'
    },
    acceptedStatus: {
        fontWeight: 'bold',
        color: '#006600'
    }
    
});