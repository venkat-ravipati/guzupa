import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
    isLoggedIn : boolean;
    login: (email:string, password:string) => void;
    logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children} : {children:ReactNode}){
       const [isLoggedIn, setIsLoggedIn] = useState(false);

       function login(email:string, password:string){
        if(email && password){
            setIsLoggedIn(true);
        }
       };

       function logOut(){
        setIsLoggedIn(false)
       };

       return(
        <AuthContext.Provider value={{login, logOut, isLoggedIn}} >
            {children}
        </AuthContext.Provider>
       )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}