// Path: src/state.js

import React, { createContext, useContext, useState } from 'react';

// Create two contexts: one for state, one for state updates
const GlobalStateContext = createContext();
const GlobalStateUpdateContext = createContext();

// Provider component to wrap around the app in index.js
export const GlobalStateProvider = ({ children }) => {
    // Global states
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [appConfig, setAppConfig] = useState({});

    return (
        <GlobalStateContext.Provider value={{ isAuthenticated, userProfile, appConfig }}>
            <GlobalStateUpdateContext.Provider value={{ setIsAuthenticated, setUserProfile, setAppConfig }}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>
    );
};

// Custom hooks for accessing global state and setters
export const useGlobalState = () => useContext(GlobalStateContext);
export const useSetGlobalState = () => useContext(GlobalStateUpdateContext);
