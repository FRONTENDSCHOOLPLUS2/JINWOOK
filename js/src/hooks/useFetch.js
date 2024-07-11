import { useEffect, useState } from "react";

const API_SERVER = import.meta.env.VITE_API_SERVER;

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError(err.message);
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
