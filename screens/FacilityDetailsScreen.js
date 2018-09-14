import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, AsyncStorage } from 'react-native';
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
                title: '',
                address: {
                    city: {},
                    country: {}
                },
                bookings: [],
                sport: {},
                facilities: [],  
                startingHourLimit: 0,
                startingPhase: '',
                endingHourLimit: 0,
                endingPhase: '',
                price: 0,
                fieldSize: {},
                description: ''
            },
            times: [],
            date: dateArr[1] + '/' + dateArr[2] + '/' +dateArr[0],
            totalChargedAmount: 0,
            selectedTimeRanges: [],
            loading: false,
            disableBookNow: true
        }
    }

    async componentDidMount() {
        this.setState({
            screenLoading: true
        });
        this.setState({
            field: await this._facility.getFieldDetails(this.props.navigation.getParam('fieldId'))
        });
        
        //setting final times 
        let selectedTimeRanges = [];
        let bookings = this.state.field.bookings;
        for(let i = 0; i < bookings.length; i++) {
            selectedTimeRanges = selectedTimeRanges.concat(bookings[i].selectedTimeRanges);
        }
        this.setState({
            times: this._createTimeSlot(selectedTimeRanges)
        });

        //should book now button disabled or not
        let times = this.state.times;
        for(let i = 0; i < times.length; i++) {
            if(!times[i].isDisabled) {
                this.setState({
                    disableBookNow: false
                });
            }
        }

        this.setState({
            screenLoading: false
        });
    }

    _createTimeSlot = (selectedTimeRanges) => {

        let times = [{
            id: 1,
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
                    id,
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
        let isSelected = !time.isSelected;
        let newTimes = this.state.times.map(t => {return {...t}});
        newTimes.find(nt => nt.id == time.id ).isSelected = isSelected;
        this.setState({
            times: newTimes
        });
        
        if(isSelected) {
            this.setState({
                totalChargedAmount: this.state.totalChargedAmount + this.state.field.price
            });
        }
        else {
            this.setState({
                totalChargedAmount: this.state.totalChargedAmount - this.state.field.price
            });
        }

        //formatting the time object
        //time.id = time._id;
        //delete time._id;

        time.startPhase = time.startPhase.toLowerCase();
        time.endPhase = time.endPhase.toLowerCase();
        
        this.setState({
            selectedTimeRanges: [...this.state.selectedTimeRanges, time]
        });
        
    }

    _bookField = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        
        this.setState({
            loading: true
        });

        let reqObject = {
            bookedByUser: user.id,
            date: this.state.date,
            field: this.state.field._id,
            fieldManager: this.state.field.fieldManager._id,
            selectedTimeRanges: this.state.selectedTimeRanges,
            times: [],
            totalCharges: this.state.totalChargedAmount
        };

        console.log(reqObject);

        let response = await this._booking.doBookField(reqObject);
        console.log(response);

        this.setState({
            loading: false
        });
    }

    render() {
        const { field } = this.state;
        console.log(field);

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
                        Size
                    </Text>
                    <Text>
                        {field.fieldSize.width} X {field.fieldSize.length} 
                    </Text>
                    <Text style={styles.heading}>
                        Price
                    </Text>
                    <Text>
                        AED {field.price} per hour
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
                        Description
                    </Text>
                    <Text>
                        {field.description}
                    </Text>
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

                            if(time.isDisabled)
                                return <Button key={time.id} disabled={time.isDisabled} onPress={() => this._selectTimeSlot(time)} buttonStyle={time.isSelected ? styles.clickedBtn : styles.button} color='#ffffff'  fontWeight='bold' title={time.value} />
                            else    
                                return <Button key={time.id} onPress={() => this._selectTimeSlot(time)} buttonStyle={time.isSelected ? styles.clickedBtn : styles.button} color={!time.isSelected ? '#ffffff' :'#052c52'}  fontWeight='bold' title={time.value} />
                        })}
                    </View>
                    <Text style={styles.heading}>
                        Total Charges
                    </Text>
                    <Text>
                        {this.state.totalChargedAmount} AED
                    </Text>
                    <Button disabled={this.state.disableBookNow} containerViewStyle={{width: '100%', marginLeft: 0}} onPress={this._bookField} buttonStyle={styles.bookNowBtn} color={ !this.state.disableBookNow ? '#052c52': '#ffffff' }  fontWeight='bold' title='Book Now' />
                   
                    { this.state.loading ?
                        <View pointerEvents='none' style={styles.loading}>
                            <ActivityIndicator size="large" color="#052c52" />
                        </View>  

                    : null}
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
        backgroundColor: '#333'
    },
    clickedBtn: {
        marginTop: 10,
        backgroundColor: '#efb225'
    },
    bookNowBtn: {
        marginTop: 10,
        marginBottom: 10,
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
    }
});