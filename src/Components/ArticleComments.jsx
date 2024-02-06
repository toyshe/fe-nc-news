import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../utils/utils";
import { useParams } from "react-router-dom";

export default function ArticleComments(){
    const { article_id } = useParams();
    const [commentsOnArticle, setCommentsOnArticle] = useState([])

    useEffect(() => {
        getCommentsByArticleId(article_id).then(({comments}) => {
            setCommentsOnArticle(comments)
        })
    })

    return (
        <div >
            <ul className="comments-cotainer">

            {commentsOnArticle.map((comment) => {
               return <li key={comment.comment_id} className="comments" >
                    <span className="comment-user-name">{comment.author} </span>
                    <span className="comment-time">{comment.created_at}</span><br></br>
                    <span className="comment-comment">{comment.body}</span>
                    <p className="comment-vote">Votes: {comment.votes}</p>

                </li>
            })}
            </ul>
        </div>
    )
}