import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "./dataContext/dataContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "./api/postsData";

const Edit = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();

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

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);
  return (
    <main className="NewPost">
      <h2>Edit Post</h2>
      <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        ></textarea>
        <button type="submit" onClick={() => handleEdit(id)}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default Edit;
