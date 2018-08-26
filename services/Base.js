
export default class Base {
    _baseUrl = '';
    _citiesUrl = '';
    _countriesUrl = '';
    
    constructor() {
        this._baseUrl = 'http://book2play.ae/api/';
        this._citiesUrl = this._baseUrl + 'cities';
        this._countriesUrl = this._baseUrl + 'countries';
    }
    
    getBaseUrl() {
        return this._baseUrl;
    }

    async getCities() {
        try {
            let response = await fetch(this._citiesUrl);
            let responseJson = await response.json();
            return responseJson.cities;
        }
        catch(err) {
            throw new Error(err);
        }
    }

    async getCountries() {
        try {
            let response = await fetch(this._countriesUrl);
            let responseJson = await response.json();
            return responseJson.countries;
        }
        catch(err) {
            throw new Error(err);
        }
    }
}