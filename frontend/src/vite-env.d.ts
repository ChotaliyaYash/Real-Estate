/// <reference types="vite/client" />

// error type
interface catchErrorType {
    message: string,
    name: string,
    response: errorResponseType
}

interface errorResponseType {
    data: errorDataType,
    status: number,
    statusText: string,
}

interface errorDataType {
    message: string,
    success: boolean,
}

// user reponse type
export interface userResponseType {
    success: boolean
    message: string
    data: Data
}

// User
export interface userDataType {
    _id: string
    username: string
    email: string
    avatar: string
    password: string
    createdAt: string
    updatedAt: string
}
