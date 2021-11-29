import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import CommentIcon from '../assets/comment.svg';
import { GiStopSign } from "react-icons/gi";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { FaThermometerFull, FaThermometerHalf, FaThermometerEmpty } from "react-icons/fa";

// styles
import './ProjectList.css';

export default function ProjectList({ projects }) {

    return (
        <div className="project-list">
            {projects.length === 0 && <p>No projects yet.</p>}
            {projects.map(project => (
                <Link to={`/projects/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>Due by: {project.dueDate.toDate().toDateString()}
                        {project.dueDate.toDate().toLocaleString() + '' < new Date().toLocaleString() + '' ?
                            <span className="overdue-label">Overdue</span>
                            : null
                        }
                    </p>
                    <p className="project-priority">
                        {project.priority === 'Blocker' &&
                            <p className="priority-blocker"><GiStopSign /> Blocker</p>}
                        {project.priority === 'Critical' &&
                            <p className="priority-critical"><GrStatusCriticalSmall /> Critical</p>}
                        {project.priority === 'Major' &&
                            <p className="priority-major"><FaThermometerFull /> Major</p>}
                        {project.priority === 'Minor' &&
                            <p className="priority-minor"><FaThermometerHalf /> Minor</p>}
                        {project.priority === 'Trivial' &&
                            <p className="priority-trivial"><FaThermometerEmpty /> Trivial</p>}
                    </p>
                    <p className="project-snippet">
                        {project.details.substring(0, 100)}...
                    </p>
                    <p className="project-comment-number">
                        <img src={CommentIcon} className="comment-icon" />
                        {project.comments.length}
                        {project.comments.length === 1 ? ' Comment' : ' Comments'}
                    </p>
                    <div className="assigned-to">
                        <ul>
                            {project.assignedUsersList.map((user) => (
                                <li key={user.photoURL}>
                                    <Avatar src={user.photoURL} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}
