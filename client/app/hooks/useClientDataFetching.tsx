import { useEffect, useState } from "react";

const useClientDataFetching = (apiCall:any, initialData = null) => {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      apiCall()
        .then((response:any) => {
          setData(response);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [isClient, apiCall]);

  return { data, isLoading };
};

export default useClientDataFetching;
