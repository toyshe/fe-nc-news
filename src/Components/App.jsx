import { Routes, Route } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import ArticleList from "./ArticleList";
import Home from "./Home";
import { useState } from "react";
import Navigation from "./Navigation";

function App() {
  const [articleList, setArticleList] = useState([]);

  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route
          path="/articles"
          element={
            <ArticleList
              articleList={articleList}
              setArticleList={setArticleList}
            />
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
