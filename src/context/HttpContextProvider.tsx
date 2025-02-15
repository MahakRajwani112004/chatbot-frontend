import { createContext, useCallback, useContext } from 'react';
import axios from 'axios';
import { IApiResponseData } from '../types/common';
import envConfig from '../config/env.config';
import { getMessageFromError } from '@/utils/utils';

interface IHttpContextProviderType {
	get: <RT>(endpoint: string, headers?: object) => Promise<IApiResponseData<RT>>;
	post: <RT>(endpoint: string, requestBody: object | Array<object>, headers?: object) => Promise<IApiResponseData<RT>>;
	put: <RT>(endpoint: string, requestBody: object | Array<object>, headers?: object) => Promise<IApiResponseData<RT>>;
	deleteMe: <RT>(endpoint: string, headers?: object) => Promise<IApiResponseData<RT>>;
	patch: <RT>(
		endpoint: string,
		requestBody: object | Array<object>,
		headers?: object
	) => Promise<IApiResponseData<RT>>;
}

export const HttpContext = createContext<IHttpContextProviderType | undefined>(undefined);

const AxiosService = axios.create({
	baseURL: envConfig.API_BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

export const HttpContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const get = useCallback(
		async <RT,>(endpoint: string, headers = {}): Promise<IApiResponseData<RT>> => {
			try {
				const res = await AxiosService.get(endpoint, { headers });
				return {
					success: true,
					response: res?.data?.data || res?.data,
					errorMsg: ''
				};
			} catch (err: any) {
				console.log(`🛑 GET: ${endpoint}:`, err?.response?.data?.error ?? err);
				return { success: false, errorMsg: getMessageFromError(err?.response?.data?.error ?? err) };
			}
		},
		[]
	);

	const post = useCallback(
		async <RT,>(endpoint: string, requestBody: object | Array<object>, headers = {}): Promise<IApiResponseData<RT>> => {
			try {
				const res = await AxiosService.post(endpoint, requestBody, { headers });
				return {
					success: true,
					response: res?.data?.data || res?.data,
					errorMsg: ''
				};
			} catch (err: any) {
				return { success: false, errorMsg: getMessageFromError(err?.response?.data?.error ?? err) };
			}
		},
		[]
	);

	const put = useCallback(
		async <RT,>(endpoint: string, requestBody: object | Array<object>, headers = {}): Promise<IApiResponseData<RT>> => {
			try {
				const res = await AxiosService.put(endpoint, requestBody, { headers });
				return {
					success: true,
					response: res?.data?.data || res?.data,
					errorMsg: ''
				};
			} catch (err: any) {
				return { success: false, errorMsg: getMessageFromError(err?.response?.data?.error ?? err) };
			}
		},
		[]
	);

	const patch = useCallback(
		async <RT,>(endpoint: string, requestBody: object | Array<object>, headers = {}): Promise<IApiResponseData<RT>> => {
			try {
				const res = await AxiosService.patch(endpoint, requestBody, { headers });
				return {
					success: true,
					response: res?.data?.data || res?.data,
					errorMsg: ''
				};
			} catch (err: any) {
				return { success: false, errorMsg: getMessageFromError(err?.response?.data?.error ?? err) };
			}
		},
		[]
	);

	const deleteMe = useCallback(
		async <RT,>(endpoint: string, headers = {}): Promise<IApiResponseData<RT>> => {
			try {
				const res = await AxiosService.delete(endpoint, { headers });
				return {
					success: true,
					response: res?.data?.data || res?.data,
					errorMsg: ''
				};
			} catch (err: any) {
				return { success: false, errorMsg: getMessageFromError(err?.response?.data?.error ?? err) };
			}
		},
		[]
	);

	return <HttpContext.Provider value={{ get, post, put, deleteMe, patch }}>{children}</HttpContext.Provider>;
};

export const useHttpMethodContext = () => {
	const context = useContext(HttpContext);

	if (!context) {
		throw new Error('useHttpMethodContext must be used within a HttpContextProvider');
	}

	return context;
};
