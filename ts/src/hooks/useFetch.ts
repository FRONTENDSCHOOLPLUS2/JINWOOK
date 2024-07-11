import { useEffect, useState } from "react";

const API_SERVER = import.meta.env.VITE_API_SERVER;

function useFetch<T>(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const fetchData = async () => {
    setData(null);
    setError(null);
    setLoading(true);

    try {
      if (!url.startsWith("http")) {
        url = API_SERVER + url;
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("에러가 발생했습니다!");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err instanceof TypeError) {
        console.error("네트워크 에러");
      } else if (err instanceof Error) {
        console.error(err.message);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
