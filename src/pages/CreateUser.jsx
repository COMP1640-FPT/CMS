import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    width: 900
  },
  generateButton: {
    marginTop: theme.spacing(1)
  },
  prefixCodeSelect: {
    marginTop: theme.spacing(2)
  }
}));

const prefixCodes = [
  {
    value: 'GCH',
    label: 'GCH'
  },
  {
    value: 'BCH',
    label: 'BCH'
  }
];

const CreateUser = () => {
  const classes = useStyles();
  const [prefixCode, setPrefixCode] = React.useState('GCH');

  const _handleChangePrefixCode = event => {
    setPrefixCode(event.target.value);
  };

  return (
    <Grid container type="flex" justify="center">
      <Grid container type="flex" justify="center" item xs={8}>
        <Paper className={classes.paper}>
          <form noValidate autoComplete="off">
            <Grid container spacing={4}>
              <Grid item xs={12} md={2}>
                <TextField
                  className={classes.prefixCodeSelect}
                  select
                  fullWidth
                  value={prefixCode}
                  onChange={_handleChangePrefixCode}
                >
                  {prefixCodes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField required fullWidth label="User Code" />
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  className={classes.generateButton}
                  variant="contained"
                  color="primary"
                >
                  Generate
                </Button>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Firstname" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Lastname" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Phone" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Country" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="State" />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  defaultValue="male"
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio color="primary" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio color="primary" />}
                    label="Female"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} md={6}>
                  
              </Grid>
              <Grid item xs={12} md={6}>
                <input
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="avatar"
                  type="file"
                />
                <label htmlFor="avatar">
                  <Button
                    variant="outlined"
                    component="span"
                    className={classes.button}
                  >
                    Upload
                  </Button>
                </label>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateUser;
