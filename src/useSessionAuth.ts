import { useEffect, useState } from 'react';

const useSessionAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const session = sessionStorage.getItem('userSession');
        if (session) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (email: string, password: string) => {
        // Simulate a login process
        if (email && password) {
            sessionStorage.setItem('userSession', JSON.stringify({ email }));
            setIsLoggedIn(true);
        }
    };

    const logout = () => {
        sessionStorage.removeItem('userSession');
        setIsLoggedIn(false);
    };

    return { isLoggedIn, login, logout };
};

export default useSessionAuth;