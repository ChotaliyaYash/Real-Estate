import axios from "axios"
import { userDataType } from "../../vite-env"

export const loginCall = (data: { email: string, password: string }) => {
    return axios.post('/api/v1/user/login', data)
}

export const signupcall = (data: { username: string, email: string, password: string }) => {
    return axios.post('/api/v1/user/register', data)
}

export const signupWithGoogleCall = (data: { username: string, email: string, avatar: string }) => {
    return axios.post('/api/v1/user/google', data)
}

export const deleteUserCall = (data: string) => {
    return axios.delete(`/api/v1/user/delete/${data}`);
}

export const updateUserCall = (data: userDataType) => {
    return axios.patch(`/api/v1/user/update/${data._id}`, data);
}