import { createContext } from "react";
import { useState } from "react";

export const PostContextList = createContext(
  null
  // {
  //   postItem: [],
  //   addPost: () => {},
  //   delPost: () => {},
  //   addInitialPost: () => {},
  // },
);

const StoreContext = ({ children }) => {
  const DEFAULT_POST_LIST = [];

  const [postItem, setPostItems] = useState(DEFAULT_POST_LIST);

  const delPost = (postID) => {
    const newPostitem = postItem.filter((elm) => elm.id !== postID);
    setPostItems(newPostitem);
    // console.log("delted id :" + postID);
  };

  const addPost = (
    postID,
    postTitle,
    postBody,
    postReact,
    postUser,
    postTag
  ) => {
    console.log(
      `added: ${postID}, ${postTitle} ,${postBody}  ${postReact}  ${postUser}  ${postTag}
    `
    );
    const newAddItem = [
      ...postItem,
      {
        id: postID,
        title: postTitle,
        body: postBody,
        userId: postUser,
        tags: postTag,
        reactions: postReact,
      },
    ];
    setPostItems(newAddItem);
  };

  const addInitialPost = (posts) => {
    const result = Array.isArray(posts);

    if (result) {
      // console.log(result);
      const newFetchPost = posts;
      setPostItems(newFetchPost);
    } else {
      console.log(`${posts} is not an array.`);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      // console.log(data.posts);
      // const arry = Array.isArray(data.posts);
      // console.log(arry);
      // console.log(data.posts);
      addInitialPost(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <PostContextList.Provider
      value={{
        postItem,
        addPost,
        delPost,
        addInitialPost,
        fetchPost,
      }}
    >
      {children}
    </PostContextList.Provider>
  );
};

export default StoreContext;
