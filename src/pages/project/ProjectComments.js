import { useState } from "react";
import Avatar from "../../components/Avatar";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ChatIcon from "../../assets/chat.svg";
import InputTrigger from 'react-input-trigger';

export default function ProjectComments({ project }) {

    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext();
    const { updateDocument, response } = useFirestore('projects');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        // add comment to firestore with ID and comments props
        // spread current project comments in array and add commentToAdd object
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        if (!response.error) {
            setNewComment('');
        }
    }

    return (
        <div className="project-comments">
            <div className="project-comments-header">
                <img src={ChatIcon} /><h4> Project Comments</h4>
            </div>
            {/* map through comments array */}
            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment:</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '14px'
                        }}
                    />
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}
