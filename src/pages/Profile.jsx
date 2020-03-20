import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center">
        <Typography component="h2" variant="h3">
          Profile
        </Typography>
      </Grid>
      <br />
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <img
              style={{ width: '100%', height: '500px' }}
              src="https://www.recoverysupportnavigator.org/wp-content/uploads/2016/10/bio-placeholder.png"
              alt=""
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField disabled fullWidth label="Firstname" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField disabled fullWidth label="Lastname" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField disabled fullWidth label="Code" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField disabled fullWidth label="Phone" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField disabled fullWidth label="Country" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField disabled fullWidth label="State" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField disabled fullWidth label="Gender" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField disabled fullWidth label="13/04/1999" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
