
import Base from '../services/Base';
import { AsyncStorage } from 'react-native';

export default class Booking extends Base {

    _bookingUrl = '';
    
    constructor() {
        super();
        this._bookingUrl = this.getBaseUrl() + 'bookings';
    }

    async getFieldAllBookings() {
        try {
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);

            let token = await AsyncStorage.getItem('token');
            let response = await fetch(this._bookingUrl + '/all', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(user),
            });
            let responseJSON = response.json();
            return responseJSON;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async doBookField(reqObject) {
        try {
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(this._bookingUrl + '/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(reqObject),
            });
            let responseJSON = response.json();
            return responseJSON;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }
}