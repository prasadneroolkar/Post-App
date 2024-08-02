import { createContext } from "react";
import { useState, useCallback } from "react";

export const PostContextList = createContext(null);
// null
// {
//   postItem: [],
//   addPost: () => {},
//   delPost: () => {},
//   addInitialPost: () => {},
// },

const StoreContext = ({ children }) => {
  const DEFAULT_POST_LIST = [];

  const [postItem, setPostItems] = useState(DEFAULT_POST_LIST);

  const delPost = (postID) => {
    const newPostitem = postItem.filter((elm) => elm.id !== postID);
    setPostItems(newPostitem);
    // console.log("delted id :" + postID);
  };

  useCallback(() => {}, []);

  // useCallback(() => {}, []);

  const addPost = useCallback(
    (
      postID,
      postTitle,
      postBody,
      postReactions,
      postUser,
      postTag,
      postviews = 10
    ) => {
      console.log(
        `added: ${postID}, ${postTitle} ,${postBody}  ${JSON.stringify(
          postReactions
        )}  ${postUser}  ${postTag},${postviews}
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
          reactions: postReactions,
          views: postviews,
        },
      ];
      setPostItems(newAddItem);
    },
    [postItem]
  );

  const addPostToApi = useCallback(
    async (post) => {
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
          data.tags,
          data.views
        );
        return data;
      } catch (error) {
        console.error("Error adding post:", error);
        return null;
      }
    },
    [addPost]
  );

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      setPostItems(data.posts);
      console.log("in fetch function", data.posts); // Update the state with the latest posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

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
