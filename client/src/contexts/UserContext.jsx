import { createContext, useContext } from 'react';
import useRequest from '../hooks/useRequest.js';
import usePersistedState from '../hooks/usePersistedState.js';
import { ENDPOINT_USERS } from '../config/api.js';

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
    const [user, setUser] = usePersistedState('user', null);
    const { request } = useRequest();

    const registerHandler = async (email, password) => {
        const newUser = { email, password };
        const result = await request(
            `${ENDPOINT_USERS}register`,
            'POST',
            newUser
        );
        setUser(result);
    };

    const loginHandler = async (email, password) => {
        const result = await request(`${ENDPOINT_USERS}login`, 'POST', {
            email,
            password
        });
        setUser(result);
    };

    const logoutHandler = () => {
        return request(`${ENDPOINT_USERS}logout`, 'GET', null, {
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
