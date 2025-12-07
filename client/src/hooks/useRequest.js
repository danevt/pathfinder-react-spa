import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { BASE_URL } from '../config/api.js';

export default function useRequest(initialUrl = '', initialState = null) {
    const { user, isAuthenticated } = useContext(UserContext);
    const [data, setData] = useState(initialState);
    const [url, setUrl] = useState(initialUrl);

    const request = async (endpoint, method, body, config = {}) => {
        const options = {};

        if (method) {
            options.method = method;
        }

        if (body) {
            options.headers = {
                'Content-Type': 'application/json'
            };

            options.body = JSON.stringify(body);
        }

        if (config.accessToken || isAuthenticated) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accessToken || user.accessToken
            };
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            throw response.statusText;
        }

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        return result;
    };

    useEffect(() => {
        if (!url) return;

        let isActive = true;

        const fetchData = async () => {
            try {
                const result = await request(url);
                if (isActive) setData(result);
            } catch (err) {
                if (isActive) alert(err.message);
            }
        };

        fetchData();

        return () => {
            isActive = false;
        };
    }, [url, user?.accessToken, isAuthenticated]);

    return { data, setData, setUrl, request };
}
