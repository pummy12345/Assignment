import React from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Grid, Box } from '@mui/material';

const Filters = ({ filters, setFilters }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <Box
            sx={{
                backgroundColor: 'black', // Set the background color to black
                color: 'white', // Adjust text color to white for better visibility
                padding: 2,
            }}
        >
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                        label="Min Experience"
                        type="number"
                        name="minExperience"
                        value={filters.minExperience}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        fullWidth // Ensures the input is the full width of the Grid item
                        InputLabelProps={{
                            style: { color: '#fff', fontWeight: 'bold' }, // Sets the label style
                        }}
                        InputProps={{
                            style: { color: '#fff', fontWeight: 'bold' }, // Sets the input style
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                        label="Company Name"
                        type="text"
                        name="companyName"
                        value={filters.companyName}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputLabelProps={{
                            style: { color: '#fff', fontWeight: 'bold' },
                        }}
                        InputProps={{
                            style: { color: '#fff', fontWeight: 'bold' },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                        label="Location"
                        type="text"
                        name="location"
                        value={filters.location}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputLabelProps={{
                            style: { color: '#fff', fontWeight: 'bold' },
                        }}
                        InputProps={{
                            style: { color: '#fff', fontWeight: 'bold' },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <FormControl fullWidth size="small">
                        <InputLabel style={{ color: '#fff', fontWeight: 'bold' }}>Work Type</InputLabel>
                        <Select
                            name="remote"
                            value={filters.workType}
                            onChange={handleChange}
                            label="Work Type"
                            sx={{
                                '& .MuiSelect-select': {
                                    color: '#fff', // Sets the dropdown text color
                                    fontWeight: 'bold',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#fff', // Sets border color
                                },
                            }}
                        >
                            <MenuItem value="any">Any</MenuItem>
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="On-site">On-site</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                        label="Tech Stack"
                        type="text"
                        name="techStack"
                        value={filters.techStack}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputLabelProps={{
                            style: { color: '#fff', fontWeight: 'bold' },
                        }}
                        InputProps={{
                            style: { color: '#fff', fontWeight: 'bold' },
                        }}
                    />
                </Grid> */}

                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                        label="Role"
                        type="text"
                        name="role"
                        value={filters.role}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputLabelProps={{
                            style: { color: '#fff', fontWeight: 'bold' },
                        }}
                        InputProps={{
                            style: { color: '#fff', fontWeight: 'bold' },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                        label="Min Base Pay"
                        type="number"
                        name="minBasePay"
                        value={filters.minBasePay}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputLabelProps={{
                            style: { color: '#fff', fontWeight: 'bold' },
                        }}
                        InputProps={{
                            style: { color: '#fff', fontWeight: 'bold' },
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Filters;
