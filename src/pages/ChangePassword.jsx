import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: 'calc(100vh - 300px)'
  },
  paper: {
    padding: theme.spacing(2),
    width: 400
  }
}));
const ChangePassword = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      type="flex"
      className={classes.container}
      justify="center"
      alignItems="center"
      direction="column"
    >
      <Typography component="h2" variant="h3">
        Change Password
      </Typography>
      <br />
      <br />
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <TextField required fullWidth label="Old password" />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth label="New password" />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth label="Re-new password" />
        </Grid>
        <br />
        <Grid container justify="center" item xs={12}>
          <Button variant="contained" color="primary">
            Change
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ChangePassword;
