
import Base from '../services/Base';
import { AsyncStorage } from 'react-native';

export default class Faciity extends Base {

    _fieldUrl = '';
    
    constructor() {
        super();
        this._fieldUrl = this.getBaseUrl() + 'fields';
    }

    async addField(reqObject) {
        try {
            
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(this._fieldUrl, {
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

    async getMyFields() {
        try {
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);

            let token = await AsyncStorage.getItem('token');
            let response = await fetch(this._fieldUrl + '/myfields/' + user.id, 
            {   
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        );
            let responseJson = await response.json();
            return responseJson.fields;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async getFieldDetails(fieldId) {
        try {
            let user = await AsyncStorage.getItem('user');
            user = JSON.parse(user);

            let token = await AsyncStorage.getItem('token');
            let response = await fetch(this._fieldUrl + '/' + fieldId, 
            {   
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        );
            let responseJson = await response.json();
            return responseJson.field;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }
}