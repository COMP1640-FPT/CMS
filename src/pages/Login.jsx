import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: 'calc(100vh - 300px)'
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width: 400
  },
  textField: {
    marginBottom: theme.spacing(2)
  }
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.container}
      container
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <TextField
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
          required
          fullWidth
          label="Email"
        />

        <TextField
          className={classes.textField}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )
          }}
          label="Password"
          type="password"
        />

        <Grid container type="flex" justify="center">
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
