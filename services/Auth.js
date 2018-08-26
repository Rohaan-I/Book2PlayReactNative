
import Base from '../services/Base';

export default class Auth extends Base {

    _authUrl = '';
    constructor() {
        super();
        this._authUrl = this.getBaseUrl() + 'account/authenticate';
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
}