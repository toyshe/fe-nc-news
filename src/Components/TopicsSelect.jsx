import { useEffect, useState } from "react";
import { getTopics } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function TopicsSelect({ articleTopic, setArticleTopic }) {
  const [topicsList, setTopicsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopicsList(topics);
    });
  }, []);

  const handleTopicsSelect = (event) => {
    setArticleTopic(event.target.value);
    navigate(`/articles?topic=${event.target.value}`);
  };

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
