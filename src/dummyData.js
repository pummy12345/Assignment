import { useState, useEffect } from 'react';

const url = 'https://api.weekday.technology/adhoc/getSampleJdJSON';

// Define the custom hook to fetch API data
export const useDummyData = () => {
    const [dummyJobs, setDummyJobs] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch data with pagination
    const fetchDummyData = async (page) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ limit: 100, offset: page * 100 }), // Set limit and offset for pagination
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            setError(err);
            return null;
        }
    };

    useEffect(() => {
        fetchDummyData(0).then((data) => {
            if (data) {
                setDummyJobs(data.jdList);
            }
        });
    }, []);

    return { dummyJobs, error, fetchDummyData };
};
