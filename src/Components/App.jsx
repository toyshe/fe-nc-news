import { Routes, Route } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import ArticleList from "./ArticleList";
import Home from "./Home";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import ArticleCard from "./ArticleCard";
import UserContext from "../Contexts/UserContext";

function App() {
  const [articleList, setArticleList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  });

  return (
    <>
      <UserContext.Provider value={{loggedInUser, setLoggedInUser}} >
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
          <Route path="/articles/:article_id" element={<ArticleCard />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
