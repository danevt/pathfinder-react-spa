import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = !!localStorage.getItem('user');

        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [navigate]);

    const isLoggedIn = !!localStorage.getItem('user');

    if (!isLoggedIn) {
        return null;
    }

    return children;
};

export default AuthGuard;
