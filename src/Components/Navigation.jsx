import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

export default function Navigation(){
    const {loggedInUser} = useContext(UserContext)
    return (
        <nav>
            <button>
                <Link to={'/'}>Home</Link>
            </button>
            <button>
                <Link to={'/articles'}>Articles</Link>
            </button>
            <p>Current User: {loggedInUser.username}</p>
        </nav>
    )
}