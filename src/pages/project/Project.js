import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

// styles
import './Project.css';
import ProjectComments from './ProjectComments';
import ProjectSummary from './ProjectSummary';

export default function Project() {

    const { id } = useParams();
    const { error, document } = useDocument('projects', id);

    if (error) {
        return <div className="error">{error}</div>
    }
    // loading message
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <>
            <div className="project-details">
                <ProjectSummary project={document} />
                <ProjectComments project={document} />
            </div>
        </>
    )
}
