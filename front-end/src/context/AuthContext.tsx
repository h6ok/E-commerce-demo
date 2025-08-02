import { createContext, useEffect, useState } from 'react';

type AuthState = {
    userId: string
    setUserId: (userid: string) => void
    isAuthenticated: boolean
    setAuthenticated: (isAuthenticated: boolean) => void
}
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider(props: {children: React.ReactNode}) {
    const [userId, setUserId] = useState('');
    const [isAuthenticated, setAuthenticated] = useState(false);

    const authContext: AuthState = {
        userId,
        setUserId,
        isAuthenticated,
        setAuthenticated
    }

    useEffect(() => {
        try {
            console.log('you are authenticated');
            setAuthenticated(true);
            setUserId('developer');
        }
        catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
};
 