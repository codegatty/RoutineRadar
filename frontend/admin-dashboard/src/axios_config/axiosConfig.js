import axios from 'axios';

export const axios_public=axios.create({
    baseURL: 'http://localhost:5000/admin',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

export const axios_private=axios.create({
    baseURL: 'http://localhost:5000/admin',
    headers: {
        'Content-Type': 'application/json',
    },withCredentials: true,
});