// api.js

import fetch from 'isomorphic-unfetch';

const API_BASE_URL = 'http://localhost:8000/';

const headers = {
    'Content-Type': 'application/json',
};

function getAuthorizationHeader() {
    let accessToken = localStorage.getItem("access_token")
    if (accessToken) {
        return { 'Authorization': `Bearer ${accessToken}` };
    }
    return {};
}

export async function callApi(endpoint, options = {}) {
    const url = API_BASE_URL + endpoint;
    const requestOptions = {
        ...options,
        headers: {
            ...headers,
            ...getAuthorizationHeader(),
            ...options.headers,
        },
    };
    const response = await fetch(url, requestOptions);
    return await response.json();
}
