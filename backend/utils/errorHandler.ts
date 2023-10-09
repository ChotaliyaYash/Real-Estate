interface errorReturn {
    error: Error,
    statusCode: number
}

export const errorHandler = (statusCode: number, message: string): errorReturn => {
    const error = new Error(message);
    return { error, statusCode };
}