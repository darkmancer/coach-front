import {createContext, useState } from 'react';
import localStorageService from '../services/localStorageService';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

function AuthContextProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(localStorageService.getToken());
    let decoded = {};
    if(localStorageService.getToken()){
    decoded = jwt_decode(localStorageService.getToken());
    // decoded = { id: 10,
    //     username: "test1",
    //     email: "test1@gmail.com",
    //     discord: "testest",}
    }
    const [user, setUser] = useState(decoded);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser}}>
        {children}
        </AuthContext.Provider>
        );

}

export default AuthContextProvider;
