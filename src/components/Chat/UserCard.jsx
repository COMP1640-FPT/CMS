import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1.7),
    cursor: 'pointer',
    '&:hover': {
        background: '#F2F2F2'
    }
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  cardContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  cardTitle: {
    color: 'rgba(0, 0, 0, 1)',
    textTransform: 'capitalize',
    fontSize: theme.spacing(2.2)
  },
  cardContent: {
    color: 'rgba(0, 0, 0, .40)'
  }
}));

const UserCard = () => {
  const classes = useStyles();

  return (
    <Grid container type="flex" justify="flex-start" className={classes.root}>
      <Grid item>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          className={classes.large}
        />
      </Grid>
      &nbsp; &nbsp;
      <div className={classes.cardContentWrapper}>
        <div className={classes.cardTitle}>Tô hải Nam</div>

        <div className={classes.cardContent}>Nam rất đẹp trai 16:30</div>
      </div>
    </Grid>
  );
};

export default UserCard;
