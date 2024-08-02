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

  const addPostToApi = async (post) => {
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error("Failed to add post");
      }
      const data = await response.json();
      addPost(
        data.id,
        data.title,
        data.body,
        data.reactions,
        data.userId,
        data.tags
      );
      return data;
    } catch (error) {
      console.error("Error adding post:", error);
      return null;
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      setPostItems(data.posts);
      // console.log(data.posts);
      // addInitialPost(data.posts);
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
        addPostToApi,
        fetchPost,
      }}
    >
      {children}
    </PostContextList.Provider>
  );
};

export default StoreContext;
