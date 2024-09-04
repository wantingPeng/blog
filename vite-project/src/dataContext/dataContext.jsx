import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/postsData";
import useWindowSize from "../hook/UseWindowSize";
import useAxiosFetch from "../hook/useAxiosFetch";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { width } = useWindowSize();

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
  async function handleEdit(id) {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const targetPost = posts.find((post) => post.id == id);
    const gotEditPost = {
      ...targetPost,
      title: editTitle,
      datetime,
      body: editBody,
    };
    setPosts(posts.map((post) => (post.id == id ? gotEditPost : post)));
    setEditTitle("");
    setEditBody("");
    navigate("/");

    try {
      console.log(id);
      await api.put(`/posts/${id}`, gotEditPost);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  async function handleDelete(id) {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
    try {
      await api.delete(`/posts/${id}`);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    setEditTitle("");
    setEditBody("");
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts[posts.length - 1].id + 1;

    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
      const response = await api.post("/posts", newPost);
      const newPosts = [...posts, response.data];
      setPosts(newPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

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
        width,
        fetchError,
        isLoading,
        handleSubmit,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        search,
        setSearch,
        posts,
        handleEdit,
        handleDelete,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
        searchResult,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
