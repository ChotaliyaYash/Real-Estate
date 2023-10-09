/// <reference types="vite/client" />

// sign up form data type
interface formDataType {
    username?: string,
    email?: string,
    password?: string,
}

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

// 