import { CountryTransportLayer } from "../transportLayer/CountryTransportLayer";
import { observable, decorate } from 'mobx';

export class CountryStore {
    countries: any;
    private transportLayer: CountryTransportLayer;
    constructor(transportLayer: any) {
        this.transportLayer = transportLayer;
        this.transportLayer.getCountries().then(result => {
            this.countries = result;
        })
    }
    FilterCountriesHandler = (filterQuery: any, searchQuery: any) => {
        if (searchQuery !== '' || filterQuery !== '') {
            return this.countries?.filter((country: any) => 
            (country.region.includes(filterQuery) && country.name.includes(searchQuery))
        )
        } else {
            return this.countries
        }
    }; 
}
decorate(CountryStore, {
    countries: observable
})