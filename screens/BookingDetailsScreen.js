import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, AsyncStorage, KeyboardAvoidingView, Alert } from 'react-native';
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
        //     screenLoading: false,
        //     field: {
        //         title: '',
        //         address: {
        //             city: {},
        //             country: {}
        //         },
        //         bookings: [],
        //         sport: {},
        //         facilities: [],  
        //         startingHourLimit: 0,
        //         startingPhase: '',
        //         endingHourLimit: 0,
        //         endingPhase: '',
        //         price: 0,
        //         fieldSize: {},
        //         description: ''
        //     },
        //     times: [],
        //     //date: dateArr[1] + '/' + dateArr[2] + '/' +dateArr[0],
        //     date: new Date().toLocaleDateString(),
        //     totalChargedAmount: 0,
        //     selectedTimeRanges: [],
            loading: false,
            rejectionReason: '',
            hasRejectionReason: true
        //     disableBookNow: true
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title')
        }
    };

    async componentDidMount() {
        // this.setState({
        //     screenLoading: true
        // });
        // this.setState({
        //     field: await this._facility.getFieldDetails(this.props.navigation.getParam('fieldId'))
        // });
        
        // //setting final times 
        // // let selectedTimeRanges = [];
        // // let bookings = this.state.field.bookings;
        // // for(let i = 0; i < bookings.length; i++) {
        // //     selectedTimeRanges = selectedTimeRanges.concat(bookings[i].selectedTimeRanges);
        // // }
        // // this.setState({
        // //     times: this._createTimeSlot(selectedTimeRanges)
        // // });
        
        // this.setState({
        //     times: this._setBookingSlotsByDate(this.state.field.bookings, this.state.date) 
        // });

        // //should book now button disabled or not
        // let times = this.state.times;
        // for(let i = 0; i < times.length; i++) {
        //     if(!times[i].isDisabled) {
        //         this.setState({
        //             disableBookNow: false
        //         });
        //     }
        // }

        // this.setState({
        //     screenLoading: false
        // });
    }

    // _createTimeSlot = (selectedTimeRanges) => {

    //     let times = [{
    //         id: 1,
    //         startHour: 12,
    //         endHour: 1,
    //         value: '12:00 AM' + ' - ' + '1:00 AM',
    //         startPhase: 'AM',
    //         endPhase: 'AM'
    //     }];
        
    //     let startPhase = 'AM';
    //     let endPhase = 'AM';
        
    //     let id = 2;

    //     // creating time slots
    //     for(let i = 1; i <= 2; i++){
    //         for(let j = 1; j <= 11; j++) {
    //             if(j == 11 && i == 1) 
    //                 endPhase = 'PM';
    //             if(j == 11 && i == 2) 
    //                 endPhase = 'AM';
        
    //             times.push({
    //                 id,
    //                 startHour: j,
    //                 endHour: j + 1,
    //                 value: j + ':00 ' +startPhase+ ' - ' + (j + 1) + ':00 ' + endPhase,
    //                 startPhase: startPhase,
    //                 endPhase: endPhase,
    //                 isSelected: false,
    //                 isDisabled: false
    //             });
        
    //             if(j == 11 && i == 1)
    //                 startPhase = 'PM';

    //             id++;
    //         }  
    //     }

    //     //setting starting and ending limit
    //     let newTimes = [];
    //     let shouldAdd = false;
    //     for(let i = 0; i < times.length; i++) {

    //         if(times[i].startHour == this.state.field.startingHourLimit &&
    //         times[i].startPhase.toLowerCase() == this.state.field.startingPhase.toLowerCase()) {
                
    //             shouldAdd = true;
    //         }
            
    //         if(shouldAdd) {
    //             newTimes.push(times[i]);
    //         }

            
    //         if(times[i].endHour == this.state.field.endingHourLimit &&
    //         times[i].endPhase.toLowerCase() == this.state.field.endingPhase.toLowerCase()) {
                
    //             shouldAdd = false;
    //         }

    //     }

    //     //disabling already selected time slots
    //     for(let i = 0; i < newTimes.length; i++) {
    //         for(let j = 0; j < selectedTimeRanges.length; j++) {
    //             if(newTimes[i].startHour == selectedTimeRanges[j].startHour 
    //             && newTimes[i].startPhase.toLowerCase() == selectedTimeRanges[j].startPhase.toLowerCase() &&
    //             newTimes[i].endHour == selectedTimeRanges[j].endHour 
    //             && newTimes[i].endPhase.toLowerCase() == selectedTimeRanges[j].endPhase.toLowerCase()) {

    //                 newTimes[i].isDisabled = true;
    //             }
    //         }
    //     }

    //     return newTimes;
    // }

    // _selectTimeSlot = (time) => {
    //     let isSelected = !time.isSelected;
    //     let newTimes = this.state.times.map(t => {return {...t}});
    //     newTimes.find(nt => nt.id == time.id ).isSelected = isSelected;
    //     this.setState({
    //         times: newTimes
    //     });
        
    //     if(isSelected) {
    //         this.setState({
    //             totalChargedAmount: this.state.totalChargedAmount + this.state.field.price
    //         });
    //     }
    //     else {
    //         this.setState({
    //             totalChargedAmount: this.state.totalChargedAmount - this.state.field.price
    //         });
    //     }

    //     //formatting the time object
    //     //time.id = time._id;
    //     //delete time._id;

    //     time.startPhase = time.startPhase.toLowerCase();
    //     time.endPhase = time.endPhase.toLowerCase();
        
    //     this.setState({
    //         selectedTimeRanges: [...this.state.selectedTimeRanges, time]
    //     });
        
    // }

    // _setBookingSlotsByDate(bookings, date) {
    //     let isMatched = false;
                               
    //     let selectedDateStr = date;
    //     let selectedTimeRanges = [];
    //     for(let i = 0; i < bookings.length; i++) {
    //         let dateStr = bookings[i].date.split('T')[0];
    //         let dateArr = dateStr.split('-');
    //         let formattedDate = dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0];

    //         if(formattedDate == selectedDateStr && 
    //             this.state.field.address.streetAddress.toLowerCase() == bookings[i].field.address.streetAddress.toLowerCase()){
    //             isMatched = true;
    //             selectedTimeRanges = selectedTimeRanges.concat(bookings[i].selectedTimeRanges);
    //         }
    //     }

        
    //     if(!isMatched) {
    //         //this.setState({
    //             return this._createTimeSlot([]);
    //         //});
    //     }
    //     else {
    //         return this._createTimeSlot(selectedTimeRanges);
    //     }
    // }

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

    render() {
        const booking  = this.props.navigation.getParam('booking');
        
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
                        <Text style={styles.heading}>
                            Customer
                        </Text>
                        <Text>
                            {booking.bookedByUser.name}
                        </Text>
                        <Text style={styles.heading}>
                            Contact Number
                        </Text>
                        <Text>
                            {booking.bookedByUser.contactNumber}
                        </Text>
                        <Text style={styles.heading}>
                            Email
                        </Text>
                        <Text>
                            {booking.bookedByUser.email}
                        </Text>
                        <Text style={styles.heading}>
                            Status
                        </Text>
                        {booking.status.toLowerCase() == 'rejected' ?
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