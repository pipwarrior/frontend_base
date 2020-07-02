import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  linkDecoration: {
    textDecoration: 'inherit',
    color: 'inherit',
  },
}));

const LinkButton = ({
  LinkTitle, 
  LinkTitleSecondary, 
  LinkUrl,
  LinkIcon
}) => {
  const classes = useStyles();

  return (
    <Link to={LinkUrl} className={classes.linkDecoration}>
      <ListItem button>
        <ListItemIcon>
          {LinkIcon}
        </ListItemIcon>
        <ListItemText 
          primary={LinkTitle} 
          secondary={LinkTitleSecondary}
        />
      </ListItem>
    </Link>
  );
}

export default LinkButton;
