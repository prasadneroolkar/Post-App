const Welcomemsg = ({ handlePost }) => {
  return (
    <>
      <center>
        <h1>No post</h1>
        <button className="btn btn-primary" onClick={handlePost}>
          Fetch Post
        </button>
      </center>
    </>
  );
};

export default Welcomemsg;
