import { useContext, useEffect, useState } from "react";
import {
  deleteCommentsOnArticle,
  getCommentsByArticleId,
} from "../utils/utils";
import { useParams } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

export default function ArticleComments({
  commentsOnArticle,
  setCommentsOnArticle,
}) {
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentsByArticleId(article_id).then(({ comments }) => {
      setCommentsOnArticle(comments);
      setIsLoading(false);
    });
  }, []);

  const handleDeleteComment = (comment_id) => {
    setIsLoading(true)
    deleteCommentsOnArticle(comment_id)
      .then(() => {
        setCommentsOnArticle((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err);
      });
  };
  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul className="comments-cotainer">
        {commentsOnArticle.map((comment) => {
          return (
            <li key={comment.comment_id} className="comments">
              <span className="comment-user-name">{comment.author} </span>
              <span className="comment-time">{comment.created_at}</span>
              <span className="comment-comment">{comment.body}</span>

              <span className="comment-vote">Votes: {comment.votes}</span>
              {loggedInUser.username === comment.author ? (
                <button
                  id="deleteCommentButton"
                  onClick={() => {
                    handleDeleteComment(comment.comment_id);
                  }}
                >
                  Delete
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
