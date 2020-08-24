import React, { useReducer, useEffect } from 'react';
import classes from './CountryCard.module.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useStore } from '../../../stores/StoreHook';
import { observer } from 'mobx-react';

interface ICountryCardProps {
    countries: any
}
const CountryCard = observer((props: ICountryCardProps) => {
    const { appStore } = useStore();
    const [, forceRender] = useReducer((s) => s + 1, 0);
    useEffect(() => {
        forceRender();
    }, [appStore.isDarkTheme])
    
    return (
        <>
            {
                props.countries?.map((country: any) => (
                    <div className={'col'}>
                        <Link to={`/country-details/${country.name}`} className={classNames(classes.card, appStore.boxTheme, 'col6')}>
                            <img src={country.flag} alt="Avatar" className={classes.countryImg} />
                            <div className={classes.cardBody}>
                                <h5 className={classes.cardTitle}><b>{country.name}</b></h5>
                                <br />
                                <p><b>Population: </b>{country.population}</p>
                                <p><b>Region: </b>{country.region}</p>
                                <p><b>Capital: </b>{country.capital}</p>
                            </div>
                        </Link>
                    </div>
                )
               )
            }
        </>
    )
})

export default CountryCard;