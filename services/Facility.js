
import Base from '../services/Base';
import { AsyncStorage } from 'react-native';

export default class Faciity extends Base {

    _addFieldUrl = '';
    _myFieldsUrl = '';

    constructor() {
        super();
        this._addFieldUrl = this.getBaseUrl() + 'fields';
        this._myFieldsUrl = this.getBaseUrl() + 'fields/myfields/';
    }

    async addField(reqObject) {
        try {
            
            let token = await AsyncStorage.getItem('token');
            let response = await fetch(this._addFieldUrl, {
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

            let response = await fetch(this._myFieldsUrl + '/' + user.id);
            let responseJson = await response.json();
            return responseJson.sports;
        }
        catch(err) {
            throw new Error(err);
        }
    }
}