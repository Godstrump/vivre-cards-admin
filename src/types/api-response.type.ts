interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export type PayloadError = {
    error: {
        message: string;
    }
}

export interface ErrorResponse {
    data: Record<'data', ApiResponse<null>>
    status: number
}

export default ApiResponse