import ProjectFilter from './ProjectFilter';
import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

//styles
import './Dashboard.css';

export default function Dashboard() {

    const { user } = useAuthContext();
    const { documents, error } = useCollection('projects');
    const [currentFilter, setCurrentFilter] = useState('All');

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter);
    }

    const filteredProjects = documents ? documents.filter((document) => {
        switch (currentFilter) {
            case 'All':
                return true
            case 'Mine':
                let assignedToMe = false;
                document.assignedUsersList.forEach((u) => {
                    if (user.uid === u.id) {
                        assignedToMe = true;
                    }
                })
                return assignedToMe;
            case 'Development':
            case 'Design':
            case 'Marketing':
            case 'Sales':
            case 'Testing':
                return document.category === currentFilter;
            default:
                return true;
        }
    }) : null

    return (
        <div>
            <h1 className="page-title">Projects Dashboard</h1>
            {error && <p className="error">{error}</p>}
            {documents && (
                <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />
            )}
            {filteredProjects && <ProjectList projects={filteredProjects} />}
        </div>
    )
}
