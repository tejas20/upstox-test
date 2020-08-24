import React, { useEffect, useState, useReducer } from 'react'
import { useStore } from '../../stores/StoreHook';
import { observer } from 'mobx-react';
import Toolbar from '../Toolbar/Toolbar'
import classes from './CountryDetails.module.css'
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

interface ICountryDetailProps {
    id?: any;
}
const CountryDetails = observer((props: ICountryDetailProps) => {
    const {
        countryStore,
        appStore
    } = useStore();
    const [country, setCountry] = useState < any > ({});
    const containerWrapper = classNames('container', classes.wrapper);
    const outerBlock = classNames('row', classes.outerBlock);
    useEffect(() => {
        setCountry(countryStore.countries?.find((country: any) => country.name === props.id));
    }, [countryStore.countries, props.id]);
    const [, forceRender] = useReducer((s) => s + 1, 0);
    useEffect(() => {
        forceRender();
    }, [appStore.isDarkTheme])

    return(
        <div className={appStore.theme}>
            <Toolbar />
            <div className={containerWrapper}>
                <Link to={`/`} type="button" className={classNames(classes.btn, appStore.boxTheme)}>
                <FontAwesomeIcon icon={faArrowLeft} className={classes.fa} /> Back
                </Link>
                <br />
                <div className={outerBlock}>
                    <div className={'col'}>
                        <img src={country?.flag} className={classes.countryImg} alt="" />
                    </div>
                    <div className={'col'}>
                        <h1>{country?.name}</h1>
                        <div>
                            <ul className={classes.DetailList}>
                                <li><b>Native Name:</b> {country?.nativeName} </li>
                                <li><b>Population:</b> {country?.population} </li>
                                <li><b>Region:</b> {country?.region} </li>
                                <li><b>Sub Region:</b> {country?.subregion} </li>
                                <li><b>Capital:</b> {country?.capital} </li>
                                <li><b>Top Level Domains:</b> {country?.topLevelDomain} </li>
                                {/* getting all currency names */}
                                <li><b>Currencies:</b> {country?.currencies?.map((country: any) => (<span> {country?.name}
                                    </span>))} </li>
                                {/* getting all languages */}
                                <li><b>Languages:</b> {country?.languages?.map((country: any) => (<span> {country?.name} </span>))}
                                </li>
                            </ul>
                        </div>
                        <div>
                            {/* getting border countries and comparing their alpha3Code names
                            with the list to render names */}
                            Border Countries: {country?.borders?.map((country: any) => (
                            <Link type="button" className={classNames(classes.btn, appStore.boxTheme)}
                                to={`/country-details/${countryStore?.countries?.find((countryInfo: any)=> countryInfo.alpha3Code ===
                            country)?.name}`}>{countryStore?.countries?.find((countryInfo: any) => countryInfo.alpha3Code === country)?.name}</Link>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default CountryDetails;