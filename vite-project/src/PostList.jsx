import Post from "./Post";

const PostList = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </>
  );
};

export default PostList;
