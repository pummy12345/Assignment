import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { red, green } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Grid from '@mui/material/Grid';
import AddLocationIcon from '@mui/icons-material/AddLocation';
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

function JobDetails({ jobs,loadMoreJobs, hasMore  }) {
  const [expandedJobId, setExpandedJobId] = React.useState(null);

  const handleExpandClick = (jobId) => {
    setExpandedJobId((prevExpandedJobId) => (prevExpandedJobId === jobId ? null : jobId));
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
  title={
    <Typography variant="h6" component="div" style={{  fontSize: '1.0rem' }}>
      <strong>{capitalizeFirstLetter(job.jobRole)} </strong>
    </Typography>
  }
  subheader={
    <>
    <Typography variant="h6" component="div" style={{  fontSize: '1.0rem',color: 'blue'  }}>
      <strong>{capitalizeFirstLetter(job.location)}</strong>
    </Typography>
    </>
  }
/>

            <CardContent>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '0.7rem' }}>

<strong>Estimated Salary: {job.minJdSalary !== null && job.minJdSalary !== undefined ? job.minJdSalary : 0}-{job.maxJdSalary} USD</strong>
                
                <CheckBoxIcon color="success" sx={{ fontSize: '1rem', marginLeft: '8px' }} />
              </Typography>
            </CardContent>
            <CardContent>
  <Typography variant="body2" color="text.secondary">
    <strong>Experience Required:</strong>  <span style={{ color: 'red' }}>
    {job.minExp!==null&& job.minExp !== undefined?job.minExp:"0"}-{job.maxExp!==null&& job.maxExp !== undefined?job.maxExp:50} years
  </span> <br/>{job.jobDetailsFromCompany.length > 100 ? (
      <>
        {job.jobDetailsFromCompany.substring(0, 100)}...
        <Button size="small" onClick={() => handleExpandClick(index)}>
          {expandedJobId === index ? 'Show Less' : 'Show More'}
        </Button>
      </>
    ) : (
      job.jobDetailsFromCompany
    )}
  </Typography>
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{ marginTop: '8px' }}
  >
    {job.jobDescription?.length > 100 ? (
      <>
        {job.jobDescription.substring(0, 100)}...
        <Button size="small" onClick={() => handleExpandClick(index)}>
          {expandedJobId === index ? 'Show Less' : 'Show More'}
        </Button>
      </>
    ) : (
      job.jobDescription || ''
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
              <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }} onClick={() => alert('Apply Now')}>
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

