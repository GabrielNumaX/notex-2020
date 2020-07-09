import axios from 'axios';

export function setToken(token) {

    return localStorage.setItem('notex-token', JSON.stringify(token));
}

export function getToken() {

    const token = localStorage.getItem('notex-token');

    if(!token) {

        return null;
    }

    return token;
}

export function delToken() {

    return localStorage.removeItem('notex-token');
}

export function axiosHeader() {

    axios.interceptors.request.use(function (config) {

        const token = getToken();
        config.headers.Authorization = token;

        return config;
    })
}