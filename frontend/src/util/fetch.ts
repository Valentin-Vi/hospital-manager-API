import { API_URL, SERVICE_API_URL } from './constants';

export async function api(route: string, options: RequestInit) {
    options.credentials = options.credentials || 'include';
    options.mode = options.mode || 'cors'

    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    };

    let res = await fetch(API_URL + route, options);

    if(!res.ok) {
        console.log('Access token expired. Attempting to refresh...');
        
        const refRes = await fetch(API_URL + '/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        
        if(refRes.ok) {
            res = await fetch(API_URL + route, options);
        } else {
            console.log('Refresh token expired or is invalid. Login is required...');
            throw new Error('Session expired. Please log in again.');
        };
    };

    return res;
};

export async function servApi(route: string, options: RequestInit) {
    options.credentials = options.credentials || 'include';
    options.mode = options.mode || 'cors'

    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    };

    let res = await fetch(SERVICE_API_URL + route, options);

    if (!res.ok) {
        console.log('Access token expired. Attempting to refresh...');

        const refRes = await fetch(SERVICE_API_URL + '/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (refRes.ok) {
            res = await fetch(SERVICE_API_URL + route, options);
        } else {
            console.log('Refresh token expired or is invalid. Login is required...');
            throw new Error('Session expired. Please log in again.');
        }
    }

    return res;
};