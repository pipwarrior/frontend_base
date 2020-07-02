import React from 'react';
import { makeStyles, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px'
  },
  headerStyle: {
    margin: '0',
    padding: '0',
  },
  listItemStyle: {
    border: '2px solid #D8D8D8',
    marginBottom: '10px',
  }
}))

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h5'>Welcome to my catalog</Typography>
      <List>
        <ListItem className={classes.listItemStyle}>
          <ListItemIcon>
            <VerifiedUserIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant='h6'>
              Admin rights:
            </Typography> 
            <Typography variant='subtitle1'>
              Catalog: View, add, edit, delete items. <br />
              Sales platform: Manage sales platform. (not done)<br />
              Settings: View and edit own profile. (not done) <br />
              Manage users: Add and remove users. (not done)
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.listItemStyle}>
          <ListItemIcon>
            <EmojiPeopleIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography variant='h6'>
              Client rights:
            </Typography> 
            <Typography variant='subtitle1'>
              Catalog: View items. <br />
              Settings: View and edit own profile. (not done) <br />
              Manage users: Add and remove users. (not done)
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  )
}

export default Home;