import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, IconButton, Typography,
  SwipeableDrawer, List, Divider
} from '@material-ui/core';
import LinkButton from './LinkButton';
import MenuIcon from '@material-ui/icons/Menu';
import StoreIcon from '@material-ui/icons/Store';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  leftMargin: {
    marginLeft: '18px',
  },
}));

const LeftIcon = () => {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState({ ...drawerState, open });
  };

  const leftDrawerList = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Typography variant="h6" className={classes.leftMargin}>
          Menu
        </Typography>
        <LinkButton 
          LinkTitle='Catalog'
          LinkUrl='/catalog'
          LinkIcon={<StoreIcon />}
        />
        <LinkButton 
          LinkTitle='Sales platform'
          LinkUrl='/'
          LinkIcon={<MonetizationOnIcon />}
        />
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <IconButton 
        onClick={toggleDrawer(true)} 
        edge="start" 
        className={classes.menuButton} 
        color="inherit" 
        aria-label="menu"
      >
          <MenuIcon/>
      </IconButton>

      <SwipeableDrawer
        anchor='left'
        open={drawerState}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {leftDrawerList}
      </SwipeableDrawer>
    </div>
  )
}

export default LeftIcon;
