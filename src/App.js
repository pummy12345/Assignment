import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import JobDetails from './components/JobDetails';
import { useDummyData } from './dummyData';
import './App.css';

const App = () => {
    // Use the custom hook to fetch data
    const { dummyJobs, error, fetchDummyData } = useDummyData();

    // Define state variables
    const [filters, setFilters] = useState({
        minExperience: '',
        companyName: '',
        location: '',
        workType: 'any',
        techStack: '',
        role: '',
        minBasePay: '',
    });

    const [filteredJobs, setFilteredJobs] = useState(dummyJobs);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Function to filter jobs based on filters
    const filterJobs = () => {
        const filtered = dummyJobs.filter((job) => {
            // Apply filter logic here
            const minExperienceMatch = filters.minExperience === '' || job.experience >= parseInt(filters.minExperience, 10);
            const companyNameMatch = filters.companyName === '' || job.company.toLowerCase().includes(filters.companyName.toLowerCase());
            const locationMatch = filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase());
            const workTypeMatch = filters.workType === 'any' || 
                                  (filters.workType === 'Remote' && job.remote) ||
                                  (filters.workType === 'onsite' && !job.remote);
            const techStackMatch = filters.techStack === '' || job.techStack.join(',').toLowerCase().includes(filters.techStack.toLowerCase());
            const roleMatch = filters.role === '' || job.role.toLowerCase().includes(filters.role.toLowerCase());
            const minBasePayMatch = filters.minBasePay === '' || job.basePay >= parseInt(filters.minBasePay, 10);

            return minExperienceMatch && companyNameMatch && locationMatch && workTypeMatch && techStackMatch && roleMatch && minBasePayMatch;
        });

        setFilteredJobs(filtered);
    };

    // Use useEffect to filter jobs when filters change or dummyJobs change
    useEffect(() => {
        filterJobs();
    }, [filters, dummyJobs]);

    // Function to load more jobs when the user reaches the bottom
    const loadMoreJobs = async () => {
        if (loading || !hasMore) {
            return;
        }

        setLoading(true);

        try {
            const moreJobs = await fetchDummyData(currentPage + 1);
            if (moreJobs?.jdList.length > 0) {
                setFilteredJobs((prevJobs) => [...prevJobs, ...moreJobs.jdList]);
                setCurrentPage(currentPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading more jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            {error ? (
                <div className="error-message">Error loading data: {error.message}</div>
            ) : (
                <>
                    {/* Pass filters and setFilters to Filters component */}
                    <Filters filters={filters} setFilters={setFilters} />

                    {/* Pass filteredJobs, loadMoreJobs, and hasMore to JobDetails component */}
                    <JobDetails jobs={filteredJobs} loadMoreJobs={loadMoreJobs} hasMore={hasMore} />
                </>
            )}
        </div>
    );
};

export default App;
