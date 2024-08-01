import { createContext } from "react";
import { useState } from "react";

export const PostContextList = createContext([
  {
    postItem: [],
    addPost: () => {},
    delPost: () => {},
    addInitialPost: () => {},
  },
]);

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
    console.log(posts);
    const newFetchPost = posts;
    setPostItems(newFetchPost);
  };

  return (
    <PostContextList.Provider
      value={{
        postItem,
        addPost,
        delPost,
        addInitialPost,
      }}
    >
      {children}
    </PostContextList.Provider>
  );
};

export default StoreContext;
