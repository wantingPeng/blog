import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataurl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source(); // create a cancel token object that contains a token and a cancel function.

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token, //// Pass the token to the request
        });
        if (isMounted) {
          //If you make an asynchronous request (like axios.get) and the request resolves after the component is unmounted
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setTimeout(() => setIsLoading(false), 2000);
      }
    };
    fetchData(dataurl);

    const cleanUp = () => {
      isMounted = false;
      source.Cancel;
    };
    return cleanUp;
  }, [dataurl]);
  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
