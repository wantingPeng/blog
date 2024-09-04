import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DataContext from "./dataContext/dataContext";

const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id == id);
  return (
    <div className="PostPage">
      <main className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
            <Link to={`/edit/${id}`}>
              <button className="editButton"> Edit Post</button>
            </Link>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, thats disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default PostPage;
