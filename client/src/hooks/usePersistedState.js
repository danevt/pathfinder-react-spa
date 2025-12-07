import { useState } from 'react';

export default function usePersistedState(key, initialState) {
    const [state, setState] = useState(() => {
        try {
            const storageData = localStorage.getItem(key);

            if (!storageData) {
                return initialState;
            }

            const data = JSON.parse(storageData);

            return data;
        } catch {
            return initialState;
        }
    });

    const setPersistedState = input => {
        let value;

        if (typeof input === 'function') {
            value = input(state);
        } else {
            value = input;
        }

        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    };

    return [state, setPersistedState];
}
