import { useEffect, useState } from "react";
import getAllArticles from "../utils/utils";
import { useSearchParams, useNavigate } from "react-router-dom";
import SortArticles from "./SortArticles";
import ErrorHandling from "./ErrorHandling";

export default function ArticleList({
  articleList,
  setArticleList,
  articleTopic,
}) {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getAllArticles(articleTopic || searchParams.get("topic")).then(({ total_count }) => {
      setTotalPages(Math.ceil(total_count / 10));
    });
    getAllArticles(
      searchParams.get("topic"),
      sortBy,
      order,
      searchParams.get("p")
    )
      .then(({ articles }) => {
        setArticleList(articles);
      })
      .catch((err) => {
        setError(err);
      });
  }, [page, searchParams, sortBy, order]);

  const handleArticleClick = (article) => {
    navigate(`/articles/${article.article_id}`);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    navigate(
      `${
        searchParams.get("topic")
          ? `/articles?topic=${searchParams.get("topic")}&p=${pageNumber}`
          : `/articles?p=${pageNumber}`
      }`
    );
  };

  if (error) {
    return <ErrorHandling error={error} />;
  }

  return (
    <div className="article-list">
      <SortArticles setSortBy={setSortBy} setOrder={setOrder} />
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

