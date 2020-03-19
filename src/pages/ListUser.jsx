import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '../components/Table';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const ListUser = () => {
  const classes = useStyles();
  const [data, setData] = React.useState([
    {
      code: 'GCH16500',
      firstname: 'Tô Hải',
      lastname: 'Nam',
      email: 'namthgch16500@fpt.edu.vn',
      role: 'admin',
      phone: '0384022828'
    }
  ]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Code',
        accessor: 'code'
      },
      {
        Header: 'Fullname',
        id: 'fullname',
        accessor: (user, rowIndex) => {
          return get(user, 'firstname', '') + ' ' + get(user, 'lastname', '');
        }
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Phone',
        accessor: 'phone'
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
  return (
    <React.Fragment>
      <Grid container type="flex" justify="center">
        <Typography component="h2" variant="h3">
          List Users
        </Typography>
      </Grid>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
      &nbsp;&nbsp;
      <Button variant="contained" color="primary">
        Search
      </Button>
      <br />
      <br />
      <Paper>
        <Table columns={columns} data={data} />
      </Paper>
    </React.Fragment>
  );
};

export default ListUser;
