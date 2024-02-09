import { useState } from "react";
import { patchArticleVotes } from "../utils/utils";
import { useParams } from "react-router-dom";
import ErrorHandling from "./ErrorHandling";

export default function VoteArticle({ articleInfo, setArticleInfo }) {
  const { article_id } = useParams();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [error, setError] = useState(null);

  const updateVote = (num) => {
    setArticleInfo((currentArticle) => {
      const clonedArticle = { ...currentArticle };
      clonedArticle.votes = clonedArticle.votes + num;
      return clonedArticle;
    });
    patchArticleVotes(article_id, num).catch((err) => {
      setError(err);
    });
    if (num === 1) {
      setLiked(true);
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  if (error) {
    return <ErrorHandling error={error} />;
  }

  return (
    <>
      <p>Votes: {articleInfo.votes}</p>
      <button
        onClick={() => {
          updateVote(1);
        }}
        disabled={liked}
      >
        👍
      </button>
      <button
        onClick={() => {
          updateVote(-1);
        }}
        disabled={disliked}
      >
        👎
      </button>
    </>
  );
}
