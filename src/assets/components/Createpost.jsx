import { useRef } from "react";
import { useContext } from "react";
import { PostContextList } from "../store/post-list-store";

const Createpost = () => {
  const { addPostToApi } = useContext(PostContextList);

  const useTitle = useRef();
  const useBody = useRef();
  const useReact = useRef();
  const useDis = useRef();
  const useId = useRef();
  const useTag = useRef();

  const postAdd = async (e) => {
    e.preventDefault();

    const postTitle = useTitle.current.value.trim();
    const postBody = useBody.current.value.trim();
    const postReact = parseInt(useReact.current.value, 10) || 0;
    const postDis = parseInt(useDis.current.value, 10) || 0;
    const postId = parseInt(useId.current.value, 10) || 0;
    const postTag = useTag.current.value
      .split(/\s+/)
      .filter((tag) => tag.trim() !== "");

    const newItems = {
      title: postTitle,
      body: postBody,
      reactions: { likes: postReact, dislikes: postDis },
      userId: postId,
      tags: postTag,
    };
    // addInitialPost(Date.now(), postTitle, postBody, postReact, postId, postTag);
    const addedPost = await addPostToApi(newItems);
    if (addedPost) {
      useTitle.current.value = "";
      useBody.current.value = "";
      useReact.current.value = "";
      useDis.current.value = "";
      useId.current.value = "";
      useTag.current.value = "";
    }
  };

  return (
    <form className="create-post" onSubmit={postAdd}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Enter your User Id here
        </label>
        <input
          ref={useId}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={useTitle}
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          ref={useBody}
          type="text"
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of Likes
        </label>
        <input
          ref={useReact}
          type="text"
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dislikes" className="form-label">
          Number of dislikes
        </label>
        <input
          ref={useDis}
          type="text"
          className="form-control"
          id="dislikes"
          placeholder="How many people disliked"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here
        </label>
        <input
          ref={useTag}
          type="text"
          className="form-control"
          id="tags"
          placeholder="Please enter tags using space"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Createpost;
