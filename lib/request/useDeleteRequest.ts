import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function useDeleteRequest() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const deleteRequest = (url: string) => {
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);
        setError(null);

        const token = Cookies.get("token");

        return axios
            .delete(url, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            })
            .then((res) => {
                setData(res.data);
                setIsSuccess(true);
                return res.data;
            })
            .catch((err) => {
                const errMsg = err.response?.data || err.message;
                setIsError(true);
                setError(errMsg);
                return null;
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        deleteRequest,  // langsung pakai deleteRequest(url).then(...).catch(...)
        isLoading,
        isSuccess,
        isError,
        error,
        data,
    };
}
