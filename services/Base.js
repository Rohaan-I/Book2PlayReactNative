
export default class Base {
    _baseUrl = '';
    _citiesUrl = '';
    _countriesUrl = '';
    
    constructor() {
        this._baseUrl = 'http://book2play.ae/api/';
        this._citiesUrl = this._baseUrl + 'cities';
        this._countriesUrl = this._baseUrl + 'countries';
        this._sportsUrl = this._baseUrl + 'sports';
        this._facilitiesUrl = this._baseUrl + 'facilities';
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

    async getSports() {
        try {
            let response = await fetch(this._sportsUrl);
            let responseJson = await response.json();
            return responseJson.sports;
        }
        catch(err) {
            throw new Error(err);
        }
    }

    async getFacilities() {
        try {
            let response = await fetch(this._facilitiesUrl);
            let responseJson = await response.json();
            return responseJson.facilities;
        }
        catch(err) {
            throw new Error(err);
        }
    }
}