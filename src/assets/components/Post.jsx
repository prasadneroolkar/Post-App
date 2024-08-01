import { MdOutlineDelete } from "react-icons/md";
import { useContext } from "react";
import { PostContextList } from "../store/post-list-store";
const Post = ({ post }) => {
  const { delPost } = useContext(PostContextList);

  const delItem = () => {
    delPost(post.id);
  };
  return (
    <div className="card post-card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>

        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          onClick={delItem}
        >
          <MdOutlineDelete />
        </span>
        <p className="card-text">{post.body}</p>
        <p className="alert alert-success reactions" role="alert">
          This post has been reacted by
          {post.reactions.dislikes + post.reactions.likes} people.
        </p>
        <p>{post.userId}</p>

        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary hashtag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Post;
