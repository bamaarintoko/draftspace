
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";

type Method = "get" | "post" | "put" | "delete" | "patch";

interface UseRequestOptions {
	method?: Method;
	body?: any;
	autoFetch?: boolean;
	headers?: Record<string, string>;
}

export function useRequest<T = any>(
	endpoint: string,
	options: UseRequestOptions = { method: "get", autoFetch: true }
) {
	const { method = "get", body = null, autoFetch = true, headers = {} } = options;

	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(autoFetch);
	const [isSuccess, setIsSuccess] = useState(false); // ✅ new state
	const send = async (overrideBody?: any) => {
		setIsLoading(true);
		const token = Cookies.get("token");
		try {
			const response = await api.request<T>({
				url: endpoint,
				method,
				data: overrideBody ?? body,
				headers: {
					"Content-Type": "application/json",
					Authorization: token ? `Bearer ${token}` : "",
					...headers,
				},
			});

			setData(response.data);
			setError(null);
			setIsSuccess(true)
			return response.data;
		} catch (err: any) {
			setError(err);
			return null;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (autoFetch && method === "get") {
			send();
		}
	}, [endpoint]);

	return { data, error, isLoading, send, isSuccess };
}
