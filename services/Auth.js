
import Base from '../services/Base';

export default class Auth extends Base {

    _authUrl = '';
    _signUpUrl = '';
    constructor() {
        super();
        this._authUrl = this.getBaseUrl() + 'account/authenticate';
        this._signUpUrl = this.getBaseUrl() + 'account';
    }

    async signInUser(email, password) {
        try {
            
            let response = await fetch(this._authUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            let responseJSON = response.json();
            return responseJSON;
        }
        catch(err) {
            throw new Error(err);
        }
    }

    async signUpUser(reqObject) {
        try {
            
            let response = await fetch(this._signUpUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqObject),
            });

            let responseJSON = response.json();
            return responseJSON;
        }
        catch(err) {
            throw new Error(err);
        }
    }

    async sendForgetPassEmail() {
        try {
            
            // let response = await fetch(this._signUpUrl, {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(reqObject),
            // });

            // let responseJSON = response.json();
            // return responseJSON;

            return {success: true};
        }
        catch(err) {
            throw new Error(err);
        }
    }
}