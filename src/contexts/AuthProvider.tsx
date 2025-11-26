import React, { useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { supabase } from "../supabase/supabaseClient";

interface AuthContextType {
    currentUser: any | null; // Supabase user type
    userLoggedIn: boolean;
    loading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen to auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setCurrentUser(session.user);
                setUserLoggedIn(true);
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        });

        // Check initial session
        (async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session?.user) {
                setCurrentUser(data.session.user);
                setUserLoggedIn(true);
            }
            setLoading(false);
        })();

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const value: AuthContextType = {
        currentUser,
        userLoggedIn,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
