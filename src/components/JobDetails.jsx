import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Card, CardHeader, CardContent, CardActions, Collapse,
  Avatar, IconButton, Typography, Button, Grid
} from '@mui/material';
import { red, green } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InfiniteScroll from 'react-infinite-scroll-component';

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

function JobDetails({ jobs, loadMoreJobs, hasMore }) {
  const [expandedJobId, setExpandedJobId] = React.useState(null);

  const handleExpandClick = (index) => {
    setExpandedJobId(prevIndex => prevIndex === index ? null : index);
  };
  const handleApplyNow = () => {
    // Specify the URL you want to navigate to
    const url = 'https://weekday.works';
    
    // Navigate to the specified URL
    window.open(url, '_blank');
};

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <InfiniteScroll
      dataLength={jobs.length} // Current number of items in the list
      next={loadMoreJobs} // Function to call when loading more jobs
      hasMore={hasMore} // Boolean indicating if there are more jobs to load
      loader={<div>Loading...</div>} // Loader to show when loading more jobs
    >
      <Grid container spacing={2}>
        {jobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                margin: '1rem',
                border: '2px solid',
                borderColor: green[500],
                borderRadius: '10px',
              }}
            >
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="job" />}
                title={<Typography variant="h6" component="div"><strong>{capitalizeFirstLetter(job.jobRole)}</strong></Typography>}
                subheader={<Typography variant="h6" component="div" style={{ color: 'blue' }}><strong>{capitalizeFirstLetter(job.location)}</strong></Typography>}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary" align="center">
                  <strong>Estimated Salary: {job.minJdSalary||'0'? `${job.minJdSalary||'0'}-${job.maxJdSalary||'0'}` : '0'} USD</strong>
                  <CheckBoxIcon color="success" sx={{ fontSize: '1rem', marginLeft: '8px' }} />
                </Typography>
                <br/>
                <Typography variant="body2" color="text.secondary">
                  <strong>Experience Required:</strong>
                  <span style={{ color: 'red' }}>
                    {`${job.minExp || ''}-${job.maxExp || 'N/A'} years`}
                  </span>
                  <br />
                  {job.jobDetailsFromCompany.length > 100 ? (
                    <>
                      {expandedJobId === index ? job.jobDetailsFromCompany : `${job.jobDetailsFromCompany.substring(0, 100)}...`}
                      <Button size="small" onClick={() => handleExpandClick(index)}>
                        {expandedJobId === index ? 'Show Less' : 'Show More'}
                      </Button>
                    </>
                  ) : (
                    job.jobDetailsFromCompany
                  )}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expandedJobId === index}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expandedJobId === index}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
                <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }} onClick={handleApplyNow}>
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
}

export default JobDetails;
