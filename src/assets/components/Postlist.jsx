import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostContextList } from "../store/post-list-store";
// import postDateID from "./Createpost";
import Welcomemsg from "./Welcomemsg";
import Loading from "./Loading";

const Postlist = () => {
  const { postItem, fetchPost } = useContext(PostContextList);
  const [fetchLoading, setLoading] = useState(false);
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      // console.log("loading (before await):", fetchLoading); // false
      await fetchPost();
      setLoading(false);
      // console.log("loading (after await):", fetchLoading); // still false
    };

    loadPosts();
  }, []);

  return (
    <>
      {fetchLoading && <Loading />}

      {!fetchLoading && postItem.length === 0 && <Welcomemsg />}

      {!fetchLoading &&
        postItem.map((elem) => <Post key={elem.id} post={elem} />)}
    </>
  );
};

export default Postlist;
