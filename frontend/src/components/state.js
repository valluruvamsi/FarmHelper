// Path: src/state.js

import { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();
const GlobalStateUpdateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null); // User profile data
    const [appConfig, setAppConfig] = useState({}); // Any app-wide configurations

    return (
        <GlobalStateContext.Provider value={{ isAuthenticated, userProfile, appConfig }}>
            <GlobalStateUpdateContext.Provider value={{ setIsAuthenticated, setUserProfile, setAppConfig }}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const setGlobalState = () => useContext(GlobalStateUpdateContext);
