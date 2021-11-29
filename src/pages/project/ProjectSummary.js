import Avatar from "../../components/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';

export default function ProjectSummary({ project }) {

    const { deleteDocument } = useFirestore('projects');
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = (e) => {
        deleteDocument(project.id);
        navigate('/');
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className="creator">Created by {project.createdBy.displayName}</p>
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.photoURL} tooltip="ttt" >
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {/* check if current user id = created by id prop on project */}
            {user.uid === project.createdBy.id && (
                <button className="btn" onClick={handleClick}>Mark as Complete</button>
            )}
        </div>
    )
}
