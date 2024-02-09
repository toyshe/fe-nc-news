import { useEffect, useState } from "react";
import { getTopics } from "../utils/utils";
import { useSearchParams } from "react-router-dom"; // Importing useSearchParams
import ErrorHandling from "./ErrorHandling";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function TopicsSelect({ setArticleTopic }) {
  const [topicsList, setTopicsList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    getTopics()
      .then(({ topics }) => {
        setTopicsList(topics);
        setLoading(false)
      })
      .catch((err) => {
        setError(err);
        setLoading(false)
      });
  }, []);

  const handleTopicsSelect = (event) => {
    setArticleTopic(event.target.value);
    navigate(`/articles?topic=${event.target.value}`);
  };
  if (error) {
    return <ErrorHandling error={error} />;
  }

  if(loading){
    return <Loading />
  }

  return (
    <>
      <p>Topics:</p>
      <select onChange={handleTopicsSelect}>
        {topicsList.map((topic) => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
    </>
  );
}
