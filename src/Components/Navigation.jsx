import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import TopicsSelect from "./TopicsSelect";

export default function Navigation({ articleTopic, setArticleTopic }) {
  const { loggedInUser } = useContext(UserContext);

  return (
    <nav>
      <button>
        <Link to={"/"}>Home</Link>
      </button>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        <Link to={"/articles"}>Articles</Link>
      </button>
      <TopicsSelect
        articleTopic={articleTopic}
        setArticleTopic={setArticleTopic}
      />
      <p>Current User: {loggedInUser.username}</p>
    </nav>
  );
}
