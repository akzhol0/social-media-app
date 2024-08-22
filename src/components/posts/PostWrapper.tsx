import Post from './Post';

type PostWrapperProps = {
  posts: any;
  deletePost: (arg0: string) => void;
  deleteFromBookmarks?: (arg0: any) => void;
};

function PostWrapper({ posts, deletePost, deleteFromBookmarks }: PostWrapperProps) {
  return (
    <>
      {posts.length ? (
        posts.map((item: any) => (
          <Post
            deleteFromBookmarks={deleteFromBookmarks}
            deletePost={deletePost}
            key={item.date}
            item={item}
          />
        ))
      ) : (
        <p>Empty...</p>
      )}
    </>
  );
}

export default PostWrapper;
