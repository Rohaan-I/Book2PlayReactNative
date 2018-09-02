
import Base from '../services/Base';
import { AsyncStorage } from 'react-native';

export default class Faciity extends Base {

    _addFieldUrl = '';
    constructor() {
        super();
        this._addFieldUrl = this.getBaseUrl() + 'fields';
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
}