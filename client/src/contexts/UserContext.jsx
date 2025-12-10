import { createContext, useContext } from 'react';
import useRequest from '../hooks/useRequest.js';
import usePersistedState from '../hooks/usePersistedState.js';

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToken: ''
    },
    registerHandler() {},
    loginHandler() {},
    logoutHandler() {}
});

export function UserProvider({ children }) {
    const [user, setUser] = usePersistedState(null);
    const { request } = useRequest();

    const registerHandler = async (email, password) => {
        const result = await request('users/register', 'POST', {
            email,
            password
        });

        const mainPart = email.split('@')[0];
        const profile = {
            _id: result._id,
            username: mainPart.charAt(0).toUpperCase() + mainPart.slice(1),
            avatar: '/images/avatars/avatar1.svg',
            aboutMe: ''
        };

        setUser({ ...result, profile });

        const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
        profiles[result._id] = profile;
        localStorage.setItem('profiles', JSON.stringify(profiles));

        return { user: result, profile };
    };

    const loginHandler = async (email, password) => {
        const result = await request('users/login', 'POST', {
            email,
            password
        });
        setUser(result);
    };

    const logoutHandler = () => {
        if (!user) return Promise.resolve();

        return request('users/logout', 'GET', null, {
            accessToken: user.accessToken
        }).finally(() => setUser(null));
    };

    const userContextValue = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler
    };

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const contextData = useContext(UserContext);

    return contextData;
}

export default UserContext;
