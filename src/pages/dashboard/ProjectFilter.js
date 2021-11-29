import FilterLogo from '../../assets/filter.svg';

const filterList = ['All', 'Mine', 'Development', 'Design', 'Sales', 'Marketing', 'Testing']

export default function ProjectFilter({ currentFilter, changeFilter }) {

    const handleClick = (newFilter) => {
        changeFilter(newFilter);
    }

    return (
        <div className="project-filter">
            <nav>
                <p><img src={FilterLogo} alt="filter by" /> </p>
                {filterList.map((f) => (
                    <button
                        key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    )
}
