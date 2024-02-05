import { useEffect, useState } from "react";
import getAllArticles from "../utils/utils";
import { useNavigate } from "react-router-dom";

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

  const handleArticleClick = (article) => {
    navigate(`/articles/${article.article_id}`)
  }

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
              <p>Comment Count: {article.comment_count}</p>
              <p>Votes: {article.votes}</p>
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
