import { useContext } from "react"
import { StoresContext } from "./Provider"
import { isNullOrUndefined } from "util"

export const useStore = () => {
    const store = useContext(StoresContext)
    if(!isNullOrUndefined(store))
        return store;
    else 
        throw new Error("useStore must be used within as Store Provider");
}