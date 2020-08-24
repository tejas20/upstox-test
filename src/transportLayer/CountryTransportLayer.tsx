export class CountryTransportLayer {
    getCountries = async (): Promise < any > => {
        let countries: any = [];
        await fetch("https://restcountries.eu/rest/v2/all") //get all country data
            .then(response => response.json())
            .then((result) => {
                    countries = result;
                },
                (error) => {
                    // ? handle http error;
                })
        return countries;
    }
}