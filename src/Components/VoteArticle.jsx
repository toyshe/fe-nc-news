import { useState } from "react";
import { patchArticleVotes } from "../utils/utils";
import { useParams } from "react-router-dom";

export default function VoteArticle({articleInfo, setArticleInfo}) {
    const { article_id } = useParams();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateVote = (num) => {
    setArticleInfo((currentArticle) => {
      const clonedArticle = { ...currentArticle };
      clonedArticle.votes = clonedArticle.votes + num;
      return clonedArticle;
    });
    patchArticleVotes(article_id, num)
      .then((data) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
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
    return <p>{error.message}</p>;
  }

//   if (isLoading) {
//     return <div>Loading Votes...</div>;
//   }

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
