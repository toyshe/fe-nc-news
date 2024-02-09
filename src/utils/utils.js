import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-a0hr.onrender.com/api",
});

export default function getAllArticles(topic, sortBy, order, page) {
  if (!sortBy) {
    sortBy = "votes";
  }
  if (!order) {
    order = "desc";
  }
  return newsApi
    .get("/articles", { params: { topic, sort_by: sortBy, order, p: page } })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function getArticleById(article_id) {
  return newsApi.get(`/articles/${article_id}`).then((response) => {
    return response.data;
  });
}

export function getCommentsByArticleId(article_id) {
  return newsApi.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data;
  });
}

export function patchArticleVotes(article_id, incVotes) {
  return newsApi
    .patch(`/articles/${article_id}`, { inc_votes: incVotes })
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      throw err;
    });
}

export function postCommentOnArticle(article_id, { username, body }) {
  return newsApi
    .post(`/articles/${article_id}/comments`, {
      username: username,
      body: body,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

export function deleteCommentsOnArticle(comment_id) {
  return newsApi.delete(`/comments/${comment_id}`).catch((err) => {
    throw err;
  });
}

export function getTopics() {
  return newsApi
    .get(`/topics`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}
