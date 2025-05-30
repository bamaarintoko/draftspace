import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'query-string';
import Cookies from 'js-cookie';

type ParamsInput = Record<string, any> | URLSearchParams;

export default function useAxiosQuery(
  endpoint: string,
  params?: ParamsInput
) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [trigger, setTrigger] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = Cookies.get('token');

    const queryString =
      params instanceof URLSearchParams
        ? params.toString()
        : qs.stringify(params || {});

    const url = `https://test-fe.mysellerpintar.com/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (err: any) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, params, trigger]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => setTrigger(prev => prev + 1);

  return { data, isLoading, error, refetch };
}
