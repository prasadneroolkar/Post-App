import { MdOutlineDelete } from "react-icons/md";
import { useContext } from "react";
import { PostContextList } from "../store/post-list-store";

const Post = ({ post }) => {
  const { delPost } = useContext(PostContextList);

  const delItem = () => {
    if (post?.id) {
      delPost(post.id);
    }
  };

  return (
    <div className="card post-card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{post.title || "Untitled Post"}</h5>

        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          onClick={delItem}
          style={{ cursor: "pointer" }}
        >
          <MdOutlineDelete />
        </span>
        <p className="card-text">{post.body || "No content available"}</p>
        <p className="alert alert-success reactions" role="alert">
          This post has been reacted by
          {(post.reactions.post?.dislikes || 0) +
            (post.reactions?.likes || 0)}{" "}
          people.
        </p>
        <p>{post.userId || "Unknown User"}</p>

        {post.tags && post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <span key={tag} className="badge text-bg-primary hashtag">
              {tag}
            </span>
          ))
        ) : (
          <p>No tags available</p>
        )}
        <p>{post.views || 0}</p>
      </div>
    </div>
  );
};

export default Post;
