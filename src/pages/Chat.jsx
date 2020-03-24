import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import UserCard from '../components/Chat/UserCard';
import ChatContent from '../components/Chat/ChatContent';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    height: 'calc(100vh - 120px)',
    overflowY: 'auto'
  }
}));

const Chat = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} md={3}>
        <Paper className={classes.paper}>
          
          <UserCard />

        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <ChatContent />
      </Grid>
    </Grid>
  );
};

export default Chat;
