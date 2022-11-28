import { createContext, useState, useEffect } from "react";
import { getCookie } from '../utils/helper';


export const RouteContext = createContext({
    setCurrentRoute: () => null,
    currentRoute: null
});

export const RouteProvider = ({ children }) => {
    const [currentRoute, setCurrentRoute] = useState(null);
    const value = { currentRoute, setCurrentRoute };

    useEffect(() => {
        if(getCookie('route')) setCurrentRoute(getCookie('route'));
    }, []);

    return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
}