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

// 