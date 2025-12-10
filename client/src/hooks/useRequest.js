import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { BASE_URL } from '../config/api.js';

export default function useRequest(url, initialState) {
    const { user, isAuthenticated } = useContext(UserContext);
    const [data, setData] = useState(initialState);

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

            throw new Error(message);
        }

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();
        return result;
    };

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        request(url, undefined, undefined, { signal: controller.signal })
            .then(result => setData(result))
            .catch(err => {
                if (err.name !== 'AbortError') alert(err.message);
            });

        return () => controller.abort();
    }, [url]);

    return {
        request,
        data,
        setData
    };
}
