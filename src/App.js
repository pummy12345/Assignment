import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import JobDetails from './components/JobDetails';
import { useDummyData } from './components/dummyData';

const App = () => {
    // Use the custom hook to fetch data
    const { dummyJobs, error, fetchDummyData } = useDummyData();

    // Define state variables for filters, filtered jobs, current page, loading, and hasMore
    const [filters, setFilters] = useState({
        minExp: '',
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
            const minExperienceMatch = filters.minExp === '' || parseInt(job.minExp, 10) >= parseInt(filters.minExperience, 10);

            const minBasePayMatch = (() => {
              // Parse `filters.minBasePay` to a number, or default to `null`
              const minPayFilter = filters.minBasePay !== '' ? parseInt(filters.minBasePay, 10) : null;
          
              // Parse `job.minJdSalary` to a number, or default to `null`
              const jobMinBasePay = job.minJdSalary !== undefined ? parseInt(job.minJdSalary, 10) : null;
          
              // If `filters.minBasePay` is not set, match the job
              if (minPayFilter === null) {
                  return true;
              }
          
              // Check that `jobMinBasePay` and `minPayFilter` are valid numbers and perform comparison
              if (jobMinBasePay !== null && minPayFilter !== null) {
                  return jobMinBasePay >= minPayFilter;
              }
          
              // Fallback: if `job.minJdSalary` is not defined or invalid, treat as non-match
              return false;
          })();
          

            // Ensure `job.company` is not undefined before calling `toLowerCase`
            const companyNameMatch = filters.companyName === '' ||
                (job.company && job.company.toLowerCase().includes(filters.companyName.toLowerCase()));

            // Ensure `job.location` is not undefined before calling `toLowerCase`
            const locationMatch = filters.location === '' ||
                (job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()));

            // Ensure `job.techStack` is an array and not undefined before accessing it
            const techStackMatch = filters.techStack === '' ||
                (job.techStack && job.techStack.join(',').toLowerCase().includes(filters.techStack.toLowerCase()));

            // Ensure `job.role` is not undefined before calling `toLowerCase`
            const roleMatch = filters.role === '' ||
                (job.jobRole && job.jobRole.toLowerCase().includes(filters.role.toLowerCase()));

            // Work type match logic
            const workTypeMatch = filters.workType === 'any' ||
                (filters.workType === 'Remote' && job.location.remote) ||
                (filters.workType === 'Onsite' && !job.location.remote);

            // Return true if the job matches all specified filters
            return minExperienceMatch &&
                minBasePayMatch &&
                companyNameMatch &&
                locationMatch &&
                workTypeMatch &&
                techStackMatch &&
                roleMatch;
        });

        // Update the filteredJobs state with the filtered jobs
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
                    <JobDetails
                        jobs={filteredJobs}
                        loadMoreJobs={loadMoreJobs}
                        hasMore={hasMore}
                        loading={loading}
                    />
                </>
            )}
        </div>
    );
};

export default App;
