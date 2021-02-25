import axios from 'axios';

export const api = axios.create({
    baseURL: "https://nilton-dscatalog.herokuapp.com/",
});

export const TOKEN = "Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==";