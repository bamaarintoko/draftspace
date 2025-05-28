import { useState, useEffect } from "react";
import api from "@/lib/axios";

type Method = "get" | "post" | "put" | "delete" | "patch";

interface UseRequestWithQueryOptions {
    method?: Method;
    headers?: Record<string, string>;
    enabled?: boolean; // untuk disable fetch awal
}

export function useRequestWithQuery<T = any>(
    endpoint: string,
    queryParams: Record<string, string | undefined>,
    options: UseRequestWithQueryOptions = { method: "get", enabled: true }
) {
    const queryObject: Record<string, string> = {};
    const { method = "get", headers = {}, enabled = true } = options;

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            queryObject[key] = String(value); // pastikan string
        }
    });

    const queryString = new URLSearchParams(queryObject).toString();

    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    useEffect(() => {
        if (!enabled) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await api.request<T>({
                    url,
                    method,
                    headers,
                });

                setData(response.data);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading, error };
}
