import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import TextareaAutosize from 'react-textarea-autosize';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    height: 'calc(100vh - 120px)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4)
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
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(1)
  }
}));

const StyledHeader = styled.div`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  padding: 8px;
`;

const StyledContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const StyledToolbar = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
`;

const StyledTextareaAutosize = styled(TextareaAutosize)`
  background: #f2f2f2;
  color: #000;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 10px 10px 10px 12px;
  font-size: 18px;
  resize: none;
  margin-right: auto;
  width: 100%;
`;

const StyledUserMessageWrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.isMe ? 'flex-end' : 'flex-start')};
  align-items: flex-end;

  padding: 8px;

  ${props => {
    if (props.isMe) {
      return `
      & > div:first-child {
        display: none;
      }
      `;
    }
  }}

  & p {
    background: ${props => (props.isMe ? '#0099FF' : '#f1f0f0')};
    color: ${props => (props.isMe ? '#FFF' : '#000')};
  }
`;

const StyledUserMessage = styled.p`
  padding: 8px;
  border-radius: 10px;
  margin: 0;
  font-size: 16px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

const ChatContent = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <StyledHeader>
        <Grid container>
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
          </div>
        </Grid>
      </StyledHeader>
      <StyledContent>
        <StyledUserMessageWrapper>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className={classes.small}
          />
          <div className={classes.messageWrapper}>
            <StyledUserMessage>hello Nam</StyledUserMessage>
            <StyledUserMessage>Nice to meet you</StyledUserMessage>
          </div>
        </StyledUserMessageWrapper>

        <StyledUserMessageWrapper isMe>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className={classes.small}
          />
          <div className={classes.messageWrapper}>
            <StyledUserMessage>I am here</StyledUserMessage>
          </div>
        </StyledUserMessageWrapper>
      </StyledContent>
      <StyledToolbar>
        <StyledTextareaAutosize
          maxRows={5}
          minRows={1}
          placeholder="Nhập tin nhắn ..."
        />
        <IconButton color="primary">
          <SendIcon fontSize="large" />
        </IconButton>
      </StyledToolbar>
    </Paper>
  );
};

export default ChatContent;
