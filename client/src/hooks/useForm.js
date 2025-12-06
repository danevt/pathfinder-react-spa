import { useState } from 'react';

export default function useForm(callback, initialValues = {}) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = e => {
        const { name, value } = e.target;
        setValues(state => ({
            ...state,
            [name]: value
        }));
    };

    const formAction = formData => {
        callback(values, formData);
    };

    const register = fieldName => ({
        name: fieldName,
        value: values[fieldName] || '',
        onChange: changeHandler
    });

    const resetForm = () => setValues(initialValues);

    return {
        values,
        setValues,
        register,
        changeHandler,
        formAction,
        resetForm
    };
}
