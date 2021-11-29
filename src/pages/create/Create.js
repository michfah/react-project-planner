import { useEffect, useState } from 'react';
import Select from 'react-select';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

import './Create.css';

// category dropdown options
const categories = [
    { value: 'Development', label: 'Development' },
    { value: 'Testing', label: 'Testing' },
    { value: 'Design', label: 'Design' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
]

const priorities = [
    { value: 'Blocker', label: 'Blocker' },
    { value: 'Critical', label: 'Critical' },
    { value: 'Major', label: 'Major' },
    { value: 'Minor', label: 'Minor' },
    { value: 'Trivial', label: 'Trivial' },
]

export default function Create() {

    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState(null);

    // get all documents from users colection for Assigned to field
    const { documents } = useCollection('users');
    const [users, setUsers] = useState([]);

    const { user } = useAuthContext();

    // add project object to firestore
    const { addDocument, response } = useFirestore('projects');

    // populate list with useEffect 
    useEffect(() => {
        if (documents) {
            const options = documents.map((user) => {
                return { value: user, label: user.displayName }
            })
            setUsers(options);
        }
    }, [documents])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        if (!category) {
            setFormError('Please select a project category');
            return;
        }
        if (!priority) {
            setFormError('Please select a priority level for the project');
            return;
        }
        if (assignedUsers.length < 1) {
            setFormError('Please select a user to assign project to');
            return;
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        // assigned user object with properties
        const assignedUsersList = assignedUsers.map((u) => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        const project = {
            name,
            details,
            category: category.value,
            priority: priority.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        await addDocument(project)
        if (!response.error) {
            navigate('/');
        }
    }

    return (
        <div className="create-form">
            <h2 className="page-title">Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                        className="textarea-input"
                    />
                </label>
                <label>
                    <span>Due Date:</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                        className="textarea-input"
                    />
                </label>
                <label>
                    <span>Project Category:</span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={categories}
                        placeholder="Select a Category"
                    />
                </label>
                <label>
                    <span>Priority:</span>
                    <Select
                        onChange={(option) => setPriority(option)}
                        options={priorities}
                        placeholder="Select Priority"
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select
                        onChange={(option) => setAssignedUsers(option)}
                        options={users}
                        isMulti
                        placeholder="Assign to User"
                        closeMenuOnSelect={false}
                    />
                </label>
                <button className="btn">Submit</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}
