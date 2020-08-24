import React, { useState, useEffect, useReducer } from 'react'
import classes from './Homepage.module.css';
import CountryCard from './CountryCard/CountryCard';
import { useStore } from '../../stores/StoreHook';
import { observer } from 'mobx-react';
import Toolbar from '../Toolbar/Toolbar';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export const Homepage = observer(() => {
const state = {
    searchQuery: '',
    filter: ''
};
const { appStore } = useStore();
useEffect(() => {
    forceRender();
}, [appStore.isDarkTheme])
const { countryStore } = useStore();
const [ countries, setCountries] = useState<any>(countryStore.countries);
const [ currentState, setState] = useState<any>(state);
const regionList = countryStore.countries?.map((country: any) => {
    return country.region;
    }).reduce((acc: any, d: any) => acc.includes(d) ? acc : acc.concat(d), []);
const searchInputBox = classNames(classes.formGroup, classes.searchInput, classes.innerAddon, classes.leftAddon, classes.fa);
const searchInput = classNames(classes.formControl, appStore.boxTheme);
const selectInputBox = classNames(classes.formGroup, classes.selectInput, classes.innerAddon, classes.rightAddon, classes.fa);
const selectInput = classNames(classes.formControl, appStore.boxTheme);
const [, forceRender] = useReducer((s) => s + 1, 0);

    useEffect(() => {
        setCountries(countryStore.countries);
    }, [countryStore.countries]);
    useEffect(() => {
        setCountries(countryStore.FilterCountriesHandler(currentState.filter, currentState.searchQuery));
    }, [currentState, countryStore]);

        return (
        <div className={appStore.theme}>
            <Toolbar />
            <div className="container">
                <div className={classes.formInline}>
                    <div className={searchInputBox}>
                        <FontAwesomeIcon icon={faSearch} className={classes.fa}/>
                        <input type="text" 
                            className={searchInput}
                            placeholder="Search for a country" 
                            value={currentState.searchQuery} 
                            onChange={(e)=>{setState({...currentState, 
                            searchQuery: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)})}}
                        />
                    </div>
                    <div className={selectInputBox}>
                        <FontAwesomeIcon icon={faCaretDown} className={classes.fa}/>
                        <select name=""
                                id=""
                                className={selectInput}
                                onChange={(e)=> setState({...currentState, filter: e.currentTarget.value})}>
                        {regionList?.map((region: any) => (
                            <option value={region}
                                    className={classes.selectOptions}> 
                                {region === ''? 'All': region} 
                            </option>
                        ))}
                        </select>
                    </div>
                </div>
                <div className={'row'}>
                        <CountryCard countries={countries} />
                </div>
            </div>
        </div>
    );
})

export default Homepage;