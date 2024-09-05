import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useWindowSize from "../hook/UseWindowSize";
import useAxiosFetch from "../hook/useAxiosFetch";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  /* 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchData();
  }, []);
 */

  useEffect(() => {
    const Result = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(Result.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        fetchError,
        isLoading,

        search,
        setSearch,
        posts,
        setPosts,

        searchResult,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
