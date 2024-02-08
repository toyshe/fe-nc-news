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

export function getCommentsByArticleId(article_id){
  return newsApi.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data;
  })
}

export function patchArticleVotes(article_id, incVotes){
  return newsApi.patch(`/articles/${article_id}`,{ inc_votes: incVotes })
    .then(response => {
      return response.data.article; 
    })
    .catch((err) => {
      throw err
    })
};
