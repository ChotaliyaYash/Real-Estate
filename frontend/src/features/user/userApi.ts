import axios from "axios"

export const loginCall = (data: { email: string, password: string }) => {
    return axios.post('/api/v1/user/login', data)
}

export const signupcall = (data: { username: string, email: string, password: string }) => {
    return axios.post('/api/v1/user/register', data)
}

export const signupWithGoogleCall = (data: { username: string, email: string, avatar: string }) => {
    return axios.post('/api/v1/user/google', data)
}