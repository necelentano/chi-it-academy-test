import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setLoading(true);

      try {
        const response = await fetch(url);
        const result = await response.json();

        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, loading, isError };
}
export default useFetch;
