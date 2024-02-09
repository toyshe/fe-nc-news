import { useContext, useState } from "react";
import { postCommentOnArticle } from "../utils/utils";
import { useParams } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import ErrorHandling from "./ErrorHandling";

export default function PostComment({ setCommentsOnArticle }) {
  const [userInputComment, setUserInputComment] = useState("");
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      username: loggedInUser.username,
    };

    if (userInputComment !== "") {
      newComment.body = userInputComment;
    }
    setCommentsOnArticle((currentComments) => {
      return [newComment, ...currentComments];
    });
    postCommentOnArticle(article_id, newComment).catch((err) => setError(err));

    setUserInputComment("");
  };

  if (error) {
    return <ErrorHandling error={error} />;
  }

  const handleChange = (event) => {
    setUserInputComment(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="postComment">Comment: </label>
      <input
        id="postComment"
        type="text"
        value={userInputComment}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}
