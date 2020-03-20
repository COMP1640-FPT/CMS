import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Table from '../components/Table';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2)
  }
}));

const ManageSubject = () => {
  const classes = useStyles();
  const [majors, setMajors] = React.useState([
    {
      value: 'IT',
      label: 'Information Technology'
    }
  ]);
  const [selectedMajor, setSelectedMajor] = React.useState('none');
  const [data, setData] = React.useState([
    {
      code: 'WD123',
      name: 'Web Development',
      major: 'IT'
    }
  ]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Code',
        accessor: 'code'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Major',
        accessor: 'major'
      },
      {
        Header: 'Action',
        id: 'action',
        accessor: (originalRow, rowIndex) => {
          return (
            <>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                size="medium"
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                size="medium"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </>
          );
        }
      }
    ],
    []
  );

  const _handleChangeSelectedMajor = event => {
    setSelectedMajor(event.target.value);
  };
  return (
    <Grid container spacing={4}>
      <Grid container justify="center" item xs={12}>
        <Typography component="h2" variant="h3">
          Manage Subject
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper>
          <Table columns={columns} data={data} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} spacing={4}>
        <Paper className={classes.paper}>
          <form noValidate autoComplete="off">
            <Grid item xs={12}>
              <TextField required fullWidth label="Subject Code" />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField required fullWidth label="Name" />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                required
                select
                fullWidth
                value={selectedMajor}
                onChange={_handleChangeSelectedMajor}
              >
                <MenuItem key="none" value="none" disabled>
                  Select Major
                </MenuItem>
                {majors.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <br />
            <br />
            <Grid container item xs={12} justify="flex-end">
              <Button variant="contained" color="primary">
                Create
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ManageSubject;
