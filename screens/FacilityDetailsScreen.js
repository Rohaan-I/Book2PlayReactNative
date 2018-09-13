import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Facility from '../services/Facility';
import Booking from '../services/Booking';

export default class FacilityDetailsScreen extends React.Component {

    _facility = null;
    
    constructor(props) {
        super(props);
        this._facility = new Facility();
        this._booking = new Booking();
        
        let date = new Date().toISOString();
        let dateStr = date.split('T')[0];
        let dateArr = dateStr.split('-');

        this.state = {
            screenLoading: false,
            field: {
                address: {
                    city: {},
                    country: {}
                },
                bookings: [],
                sport: {},
                facilities: [],    
                totalBookingAmt: 0,
                startingHourLimit: 0,
                startingPhase: '',
                endingHourLimit: 0,
                endingPhase: ''
            },
            times: [],
            date: dateArr[1] + '/' + dateArr[2] + '/' +dateArr[0]
        }
    }

    async componentDidMount() {
        this.setState({
            screenLoading: true
        });
        this.setState({
            field: await this._facility.getFieldDetails(this.props.navigation.getParam('fieldId'))
        });
        // this.setState({
        //     times: await this._facility.getTimes()
        // });
        

        //setting final times 
        this.setState({
            times: this._createTimeSlot(this.state.field.bookings[0].selectedTimeRanges)
        });


        this.setState({
            screenLoading: false
        });
    }

    _createTimeSlot = (selectedTimeRanges) => {

        let times = [{
            _id: 1,
            startHour: 12,
            endHour: 1,
            value: '12:00 AM' + ' - ' + '1:00 AM',
            startPhase: 'AM',
            endPhase: 'AM'
        }];
        
        let startPhase = 'AM';
        let endPhase = 'AM';
        
        let id = 2;

        // creating time slots
        for(let i = 1; i <= 2; i++){
            for(let j = 1; j <= 11; j++) {
                if(j == 11 && i == 1) 
                    endPhase = 'PM';
                if(j == 11 && i == 2) 
                    endPhase = 'AM';
        
                times.push({
                    _id: id,
                    startHour: j,
                    endHour: j + 1,
                    value: j + ':00 ' +startPhase+ ' - ' + (j + 1) + ':00 ' + endPhase,
                    startPhase: startPhase,
                    endPhase: endPhase,
                    isSelected: false,
                    isDisabled: false
                });
        
                if(j == 11 && i == 1)
                    startPhase = 'PM';

                id++;
            }  
        }

        //setting starting and ending limit
        let newTimes = [];
        let shouldAdd = false;
        for(let i = 0; i < times.length; i++) {

            if(times[i].startHour == this.state.field.startingHourLimit &&
            times[i].startPhase.toLowerCase() == this.state.field.startingPhase.toLowerCase()) {
                
                shouldAdd = true;
            }
            
            if(shouldAdd) {
                newTimes.push(times[i]);
            }

            
            if(times[i].endHour == this.state.field.endingHourLimit &&
            times[i].endPhase.toLowerCase() == this.state.field.endingPhase.toLowerCase()) {
                
                shouldAdd = false;
            }

        }

        //let selectedTimeRanges = this.state.field.bookings[0].selectedTimeRanges;
        //disabling already selected time slots
        for(let i = 0; i < newTimes.length; i++) {
            for(let j = 0; j < selectedTimeRanges.length; j++) {
                if(newTimes[i].startHour == selectedTimeRanges[j].startHour 
                && newTimes[i].startPhase.toLowerCase() == selectedTimeRanges[j].startPhase.toLowerCase() &&
                newTimes[i].endHour == selectedTimeRanges[j].endHour 
                && newTimes[i].endPhase.toLowerCase() == selectedTimeRanges[j].endPhase.toLowerCase()) {

                    newTimes[i].isDisabled = true;
                }
            }
        }

        return newTimes;
    }

    _selectTimeSlot = (time) => {
        let newTimes = this.state.times.map(t => {return {...t}});
        newTimes.find(nt => nt._id == time._id ).isSelected = !time.isSelected;
        this.setState({
            times: newTimes
        });
    }

    render() {
        const { field } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Image
                    style={{resizeMode:'contain', width: 300, height: 150}}
                    source={require('../assets/images/logo_field.png')}
                    />
                     <Text style={styles.firstHeading}> 
                        {field.address.streetAddress}
                    </Text> 
                    <Text>
                        {field.address.poBox},{field.address.city.city}
                    </Text>
                    <Text>
                        {field.address.country.country}
                    </Text>
                    <Text style={styles.heading}>
                        Sport
                    </Text>
                    <Text>
                        {field.sport.name}
                    </Text>
                    <Text style={styles.heading}>
                        Facilities
                    </Text>
                    <View style={styles.chipsContainer}>
                        {field.facilities.map(fac => 
                            <Text 
                                key={fac._id} 
                                style={styles.chip}>
                                
                                {fac.id.name}
                            </Text>
                        )}
                    </View>
                    <Text style={styles.heading}>
                        Bookings
                    </Text>
                    <View>

                        <DatePicker
                            style={{width: 295, marginLeft: 10, marginTop: 10}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="MM/DD/YYYY"
                            minDate="2016-05-01"
                            maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                            onDateChange={ async (date) => {
                                this.setState({date: date});
                                
                                let result = await this._booking.getFieldAllBookings();
                                let bookings = result.bookings;

                                let isMatched = false;
                                
                                let selectedDateStr = this.state.date;
                                for(let i = 0; i < bookings.length; i++) {
                                    let dateStr = bookings[i].dateAdded.split('T')[0];
                                    let dateArr = dateStr.split('-');
                                    let formattedDate = dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0];

                                    if(formattedDate == selectedDateStr && 
                                        this.state.field.address.streetAddress.toLowerCase() == bookings[i].field.address.streetAddress.toLowerCase()){
                                        isMatched = true;
                                        this.setState({
                                            times:this._createTimeSlot(bookings[i].selectedTimeRanges)
                                        });
                                        break;
                                    }
                                }

                                if(!isMatched) {
                                    this.setState({
                                        times: this._createTimeSlot([])
                                    });
                                }
                            
                            }}
                        />

                        {this.state.times.map(time => {
                            return <Button key={time._id} disabled={time.isDisabled} onPress={() => this._selectTimeSlot(time)} buttonStyle={time.isSelected ? styles.clickedBtn : styles.button} color={!time.isSelected && !time.isDisabled ? '#052c52' :'#ffffff'}  fontWeight='bold' title={time.value} />
                        })}
                    </View>
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
        marginTop: 10,
        backgroundColor: '#efb225'
    },
    clickedBtn: {
        marginTop: 10,
        backgroundColor: '#052c52'
    }
});