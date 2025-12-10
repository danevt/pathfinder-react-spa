export default function errorHandler(error, { onLogout, onAlert }) {
    if (!error) return;

    switch (error.status) {
        case 401:
            if (onLogout) onLogout();
            break;
        case 403:
            if (onAlert)
                onAlert('You do not have permission to perform this action.');
            break;
        case 404:
            if (onAlert) onAlert('Resource not found.');
            break;
        case 409:
            if (onAlert) onAlert('Resource conflict.');
            break;
        default:
            if (onAlert) onAlert(error.message || 'An error occurred.');
    }
}
