import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostContextList } from "../store/post-list-store";
// import postDateID from "./Createpost";
import Welcomemsg from "./Welcomemsg";
import Loading from "./Loading";

const Postlist = () => {
  const { postItem, addInitialPost } = useContext(PostContextList);
  const [fetchLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPost(data.posts);

        setLoading(false);
      });
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
