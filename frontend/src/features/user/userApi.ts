import axios from "axios"

export const loginCall = (data: { email: string, password: string }) => {
    return axios.post('/api/v1/login', data)
}

export const signupcall = (data: { username: string, email: string, password: string }) => {
    return axios.post('/api/v1/register', data)
}