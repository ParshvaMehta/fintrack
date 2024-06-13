import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import storageService from "./storage";

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
	(config) => {
		const token = storageService.getItem("token"); // Use storageService to get the token
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.error("Error in request interceptor", error);
		return Promise.reject(error);
	}
);

// Response interceptor for handling responses
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// HTTP service methods with proper type constraints
const httpService = {
	get: async <T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<T> => {
		try {
			const response = await axiosInstance.get<T>(url, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	post: async <T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> => {
		try {
			const response = await axiosInstance.post<T>(url, data, config);
			return response.data;
		} catch (error) {
			console.error("Error in post request", error);
			throw error;
		}
	},
	put: async <T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> => {
		try {
			const response = await axiosInstance.put<T>(url, data, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	patch: async <T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> => {
		try {
			const response = await axiosInstance.patch<T>(url, data, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	delete: async <T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<T> => {
		try {
			const response = await axiosInstance.delete<T>(url, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

export default httpService;
