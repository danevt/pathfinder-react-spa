// import { BASE_URL } from '../config/api.js';

// export default async function request(url, method = 'GET', data = null) {
//     const options = { method, headers: {} };

//     if (data && method !== 'GET' && method !== 'DELETE') {
//         options.headers['Content-Type'] = 'application/json';
//         options.body = JSON.stringify(data);
//     }

//     try {
//         const response = await fetch(`${BASE_URL}${url}`, options);

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => null);
//             throw {
//                 status: response.status,
//                 message: errorData?.message || response.statusText
//             };
//         }

//         return await response.json();
//     } catch (err) {
//         console.error('Request failed:', err);
//         throw err;
//     }
// }
