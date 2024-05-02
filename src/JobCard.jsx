import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography, Button, Avatar, IconButton, Collapse } from '@mui/material';
import { red, green } from '@mui/material/colors';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@mui/material/styles/styled';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

exportJobCard = ({ job }) => {
    const [expanded, setExpanded] = useState(false);
    
    const maxDescriptionLength = 100; // Adjust the initial description length as needed

    const handleToggleDescription = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345, margin: '1rem' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="job">
                        {job.company_name.charAt(0)}
                    </Avatar>
                }
                title={job.job_title}
                subheader={
                    <>
                        <strong>{job.company_name}</strong>
                        <br />
                        {job.location}
                    </>
                }
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                    }}
                >
                    Estimated Salary: ₹30-40 LPA
                    <CheckBoxIcon
                        color="success"
                        sx={{
                            fontSize: '2rem',
                            marginLeft: '8px'
                        }}
                    />
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {expanded ? job.job_description : `${job.job_description.slice(0, maxDescriptionLength)}...`}
                </Typography>
                <Button color="primary" onClick={handleToggleDescription}>
                    {expanded ? 'Show Less' : 'Show More'}
                </Button>
            </CardContent>
            <CardActions disableSpacing>
                <Typography color="text.secondary">
                    Experience Required: {job.experience_required}
                </Typography>
                <Button variant="contained" color="primary" href={job.apply_link}>
                    Apply
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{job.job_description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default JobCard;
