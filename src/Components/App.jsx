import { Routes, Route } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import ArticleList from "./ArticleList";
import Home from "./Home";
import { useState } from "react";
import Navigation from "./Navigation";
import ArticleCard from "./ArticleCard";

function App() {
  const [articleList, setArticleList] = useState([]);

  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/articles"
          element={
            <ArticleList
              articleList={articleList}
              setArticleList={setArticleList}
            />
          }
        />
        <Route path="/articles/:article_id" element={<ArticleCard />}/>
      </Routes>
    </>
  );
}

export default App;
