import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config/api.js';
import UserContext from '../contexts/UserContext';
import errorHandler from '../utils/errorHandler.js';

export default function useRequest(url, initialState) {
    const { user, isAuthenticated, logoutHandler } = useContext(UserContext);
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const request = async (url, method, data, config = {}) => {
        let options = {};

        if (method) {
            options.method = method;
        }

        if (data) {
            options.headers = {
                'content-type': 'application/json'
            };
            options.body = JSON.stringify(data);
        }

        if (config.accessToken || isAuthenticated) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accessToken || user.accessToken
            };
        }

        if (config.signal) {
            options.signal = config.signal;
        }

        const response = await fetch(`${BASE_URL}${url}`, options);

        if (!response.ok) {
            let message = '';

            try {
                const json = await response.json();
                message = json.message || response.statusText;
            } catch {
                message = response.statusText;
            }

            const error = new Error(message);
            error.status = response.status;

            throw error;
        }

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();
        return result;
    };

    useEffect(() => {
        if (!url) {
            return;
        }

        const controller = new AbortController();
        setLoading(true);

        request(url, undefined, undefined, { signal: controller.signal })
            .then(result => setData(result))
            .catch(error => {
                if (error.name !== 'AbortError') {
                    errorHandler(error, {
                        onAlert: message => alert(message),
                        onLogout: logoutHandler
                    });
                }
            })
            .finally(() => setLoading(false));

        return () => {
            controller.abort();
        };
    }, [url]);

    return {
        request,
        data,
        setData,
        loading
    };
}
