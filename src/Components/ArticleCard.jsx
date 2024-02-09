import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/utils";
import ArticleComments from "./ArticleComments";
import PostComment from "./PostComment";
import VoteArticle from "./VoteArticle";

export default function ArticleCard() {
  const { article_id } = useParams();
  const [articleInfo, setArticleInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsOnArticle, setCommentsOnArticle] = useState([]);

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
  }, [articleInfo.comment_count]);

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

      <VoteArticle articleInfo={articleInfo} setArticleInfo={setArticleInfo} />
      
      <p>Comment count: {articleInfo.comment_count}</p>
      <PostComment setCommentsOnArticle={setCommentsOnArticle} />
      <button onClick={toggleOpen}>{isOpen ? "Hide" : "Show"} Comments</button>
      {isOpen ? (
        <ArticleComments
          commentsOnArticle={commentsOnArticle}
          setCommentsOnArticle={setCommentsOnArticle}
        />
      ) : null}
    </div>
  );
}
