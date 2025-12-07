import { useEffect, useState } from 'react';
import { BASE_URL } from '../config/api.js';

export default function useRequest(initialUrl = '', initialState = null) {
    const [data, setData] = useState(initialState);
    const [url, setUrl] = useState(initialUrl);

    const request = async (endpoint, method, body, config = {}) => {
        let options = {};

        if (method) {
            options.method = method;
        }

        if (body) {
            options.headers = { 'Contetnt-Typr': 'application/json' };
            options.body = JSON.stringify(body);
        }

        if (config.accessToken) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accessToken
            };
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        if (!response.status === 204) return {};

        const result = await response.json();

        return result;
    };

    useEffect(() => {
        if (!url) return;

        request(url)
            .then(result => setData(result))
            .catch(error => alert(error.message));
    }, [url]);

    return { data, setData, setUrl, request };
}
