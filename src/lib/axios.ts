import axios from 'axios';

export type ApiResponse<T> = {
    data: T;
    message: string;
    statusCode: number;
};

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

export default axiosClient;
