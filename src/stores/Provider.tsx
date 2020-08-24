import React, { ReactNode } from 'react'
import { CountryStore } from './CountryStore'
import { CountryTransportLayer } from '../transportLayer/CountryTransportLayer'
import { AppStore } from './AppStore';

interface IProps {
    children: ReactNode
}
interface IStores {
    countryStore: CountryStore,
    appStore: AppStore
}
export const StoresContext = React.createContext<IStores | null>(null);

export const Provider = ({children} : IProps) => {
    const countryStore = new CountryStore(new CountryTransportLayer());
    const appStore = new AppStore();
    const stores = {
        countryStore,
        appStore
    }
    return (
        <StoresContext.Provider value={stores}>
            {children}
        </StoresContext.Provider>
    )
}