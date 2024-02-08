import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticleVotes } from "../utils/utils";
import ArticleComments from "./ArticleComments";

export default function ArticleCard() {
  const { article_id } = useParams();
  const [articleInfo, setArticleInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [voteCount, setVoteCount] = useState(
    Number(localStorage.getItem("votes")) || 0
  );
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id)
      .then(({ article }) => {
        setArticleInfo(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const upVote = () => {
    setVoteCount((currentVote) => {
      return currentVote + 1;
    });
    setLiked(true);
    setDisliked(false);
  };

  const downVote = () => {
    setVoteCount((currentVote) => {
      return currentVote - 1;
    });
    setLiked(false);
    setDisliked(true);
  };

  useEffect(() => {
    patchArticleVotes(article_id, voteCount)
      .then((data) => {
        setArticleInfo(data);
        localStorage.setItem("votes", voteCount);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [voteCount]);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <div>Loading article...</div>;
  }

  const toggleOpen = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  return (
    <div className="article-card">
      <h2>{articleInfo.title}</h2>
      <div className="article-info">
        <p>Author: {articleInfo.author}</p>
        <p>Topic: {articleInfo.topic}</p>
        <p>Created: {articleInfo.created_at}</p>
      </div>
      <div className="article-main">
        <img src={articleInfo.article_img_url} />
        <p>{articleInfo.body}</p>
      </div>
      <p>Votes: {articleInfo.votes}</p>
      <button onClick={upVote} disabled={liked}>
        👍
      </button>
      <button onClick={downVote} disabled={disliked}>
        👎
      </button>
      <p>Comment count: {articleInfo.comment_count}</p>
      <button onClick={toggleOpen}>{isOpen ? "Hide" : "Show"} Comments</button>
      {isOpen ? <ArticleComments /> : null}

    </div>
  );
}
