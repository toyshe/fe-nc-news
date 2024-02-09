import { useEffect, useState } from "react";
import getAllArticles from "../utils/utils";
import { useNavigate, useLocation } from "react-router-dom";

export default function ArticleList({
  articleList,
  setArticleList,
  articleTopic
}) {
  
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    getAllArticles(articleTopic).then(({ articles }) => {
      setTotalPages(Math.ceil(articles.length / 10));
    });

    getAllArticles(articleTopic, page).then(({ articles }) => {
      setArticleList(articles);
    });
  }, [articleTopic, page]);



  const handleArticleClick = (article) => {
    navigate(`/articles/${article.article_id}`);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    navigate(`${articleTopic ? `/articles?topic=${articleTopic}&&p=${pageNumber}` : `/articles?p=${pageNumber}`}`);
  };

  return (
    <div className="article-list">
      <ul className="article-list-box">
        {articleList.map((article) => (
          <li key={article.article_id} className="article-item">
            <button onClick={() => handleArticleClick(article)}>
              <p>{article.title}</p>
              <img src={article.article_img_url} alt={article.title} />
              <p>Author: {article.author}</p>
              <p>Topic: {article.topic}</p>
              <p>Vote: {article.votes}</p>
              <p>Comment Count: {article.comment_count}</p>
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination-buttons">

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={page === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
