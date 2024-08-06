import Post from './Post';

type PostWrapperProps = {
  posts: any;
  deletePost: (arg0: string) => void;
};

function PostWrapper({ posts, deletePost }: PostWrapperProps) {
  return (
    <>
      {posts.map((item: any) => (
        <Post deletePost={deletePost} key={item.date} item={item} />
      ))}
    </>
  );
}

export default PostWrapper;
