import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/utils";
import ArticleComments from "./ArticleComments";

export default function ArticleCard() {
  const { article_id } = useParams();
  const [articleInfo, setArticleInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getArticleById(article_id).then(({ article }) => {
      console.log(article);
      setArticleInfo(article);
    });
  }, []);

  const toggleOpen = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen)
  }

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
      <p>Comment count: {articleInfo.comment_count}</p>
      <p>Votes: {articleInfo.votes}</p> 
      <button>Vote</button>
      <button onClick={toggleOpen} >{isOpen ? 'Hide' : 'Show'} Comments</button>
      {isOpen ? <ArticleComments /> : null}
    </div>
  );
}
