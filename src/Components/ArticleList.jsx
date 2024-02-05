import { useEffect, useState } from "react";
import getAllArticles from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";

export default function ArticleList({ articleList, setArticleList }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getAllArticles().then((data) => {
      setTotalPages(Math.ceil(data.articles.length / 10));
    });
    getAllArticles(page).then((data) => {
      setArticleList(data.articles);
    });
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    navigate(`/articles?p=${pageNumber}`);
  };

  return (
    <div className="article-list">
      <ul className="article-list-box">
        {articleList.map((article) => (
          <li key={article.article_id} className="article-item">
              <p>{article.title}</p>
              <img src={article.article_img_url} alt={article.title} />
              <p>{article.author}</p>
              <p>{article.topic}</p>
              <p>Comment Count: {article.comment_count}</p>
              <p>Votes: {article.votes}</p>
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
