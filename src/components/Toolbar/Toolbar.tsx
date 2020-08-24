import React, { useEffect, useReducer } from 'react';
import classes from './Toolbar.module.css';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import { useStore } from '../../stores/StoreHook';
import { observer } from 'mobx-react';

const toolbar = observer(() => {
    const {appStore} = useStore()
    const [, forceRender] = useReducer((s) => s + 1, 0);
    useEffect(() => {
        forceRender();
    }, [appStore.isDarkTheme])

    return(
        <>
        <ul className={classNames(classes.ul, appStore.boxTheme)}>
            {
                appStore.isDarkTheme ? 
                <li className={classNames(classes.li, appStore.theme)} onClick={() => {appStore.changeTheme()}}><FontAwesomeIcon icon={faMoon}/> Light Mode</li> :
                <li className={classNames(classes.li, appStore.theme)} onClick={() => {appStore.changeTheme()}}><FontAwesomeIcon icon={faMoon}/> Dark Mode</li> 
            }
        </ul>
        </>
    )
})

export default toolbar;