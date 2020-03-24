import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { KeyboardDatePicker } from '@material-ui/pickers';

import agent from '../libs/agent';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  generateButton: {
    marginTop: theme.spacing(1)
  },
  uploadAvatarButton: {
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
  const [selectedRole, setSelectedRole] = React.useState(' ');

  const [selectedBirthday, setSelectedBirthday] = React.useState(new Date());

  const _handleBirthdayChange = date => {
    setSelectedBirthday(date);
  };

  const _handleChangePrefixCode = event => {
    setPrefixCode(event.target.value);
  };

  const _handleChangeRole = async event => {
    setSelectedRole(event.target.value);
    try {
      const result = await agent.post(
        `/api/handleRequest/user/${event.target.value}`
      );
      console.log(result, 2421);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container type="flex" justify="center">
      <Grid container type="flex" justify="center" item xs={8}>
        <Grid container type="flex" justify="center">
          <Typography component="h2" variant="h3">
            List Users
          </Typography>
        </Grid>
        <Paper className={classes.paper}>
          <form noValidate autoComplete="off">
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <TextField
                  className={classes.prefixCodeSelect}
                  select
                  fullWidth
                  value={selectedRole}
                  onChange={_handleChangeRole}
                >
                  <MenuItem disabled key={' '} value={' '}>
                    Choose role
                  </MenuItem>
                  <MenuItem key={'student'} value={'student'}>
                    Student
                  </MenuItem>
                  <MenuItem key={'tutor'} value={'tutor'}>
                    Tutor
                  </MenuItem>
                  <MenuItem key={'manager'} value={'manager'}>
                    Manager
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
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

              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="User Code" />
              </Grid>
              {/* 
              <Grid item xs={12} md={3}>
                <Button
                  className={classes.generateButton}
                  variant="contained"
                  color="secondary"
                >
                  Generate
                </Button>
              </Grid> */}

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
                <KeyboardDatePicker
                  fullWidth
                  format="dd/MM/yyyy"
                  id="Birthday"
                  label="Birthday"
                  value={selectedBirthday}
                  onChange={_handleBirthdayChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
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
                    color="secondary"
                    component="span"
                    className={classes.uploadAvatarButton}
                  >
                    Upload Avatar
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button variant="outlined">Reset</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateUser;
