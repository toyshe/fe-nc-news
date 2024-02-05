import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-a0hr.onrender.com/api",
});

export default function getAllArticles(page) {
  return newsApi.get("/articles", { params: { p: page } }).then((response) => {
    return response.data;
  });
}

export function getArticleById(article_id){
  return newsApi.get(`/articles/${article_id}`).then((response) => {
    return response.data
  })
}
