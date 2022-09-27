import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./FirebaseConfig";
import {
    signInWithEmailAndPassword,
    signOut, onAuthStateChanged,
} from "firebase/auth";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState("");
    const [pending, setPending] = useState(true);

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setPending(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    if(pending){
        return <>Patientez...</>
    }

    return <userAuthContext.Provider value={{ user, login, logOut }}> {children} </userAuthContext.Provider>;
};

export function useUserAuth() {
    return useContext(userAuthContext);
};