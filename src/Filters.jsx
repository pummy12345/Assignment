import React from 'react';

const Filters = ({ filters, setFilters }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className="filters">
            <label>
                Min Experience:
                <input
                    type="number"
                    name="minExperience"
                    value={filters.minExperience}
                    onChange={handleChange}
                />
            </label>

            <label>
                Company Name:
                <input
                    type="text"
                    name="companyName"
                    value={filters.companyName}
                    onChange={handleChange}
                />
            </label>

            <label>
                Location:
                <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleChange}
                />
            </label>

            <label>
                Work Type:
                <select
                    name="workType"
                    value={filters.workType}
                    onChange={handleChange}
                >
                    <option value="any">Any</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                </select>
            </label>

            <label>
                Tech Stack:
                <input
                    type="text"
                    name="techStack"
                    value={filters.techStack}
                    onChange={handleChange}
                />
            </label>

            <label>
                Role:
                <input
                    type="text"
                    name="role"
                    value={filters.role}
                    onChange={handleChange}
                />
            </label>

            <label>
                Min Base Pay:
                <input
                    type="number"
                    name="minBasePay"
                    value={filters.minBasePay}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
};

export default Filters;
