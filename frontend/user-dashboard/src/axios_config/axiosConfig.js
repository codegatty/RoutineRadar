import axios from 'axios';

export const axios_public=axios.create({
    baseURL: 'http://localhost:8000/routine',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false,
});

export const axios_user=axios.create({
    baseURL: 'http://localhost:5002/user',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },withCredentials: true,
});

export const axios_open=axios.create({
    baseURL: 'http://localhost:5002/user',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },withCredentials:true,
});

