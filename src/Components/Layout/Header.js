import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, AppBar, Toolbar, IconButton, Typography,
  SwipeableDrawer, List, Divider, Button
} from '@material-ui/core';
import LinkButton from './LinkButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import StoreIcon from '@material-ui/icons/Store';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
  list: {
    width: 250,
  },
  leftMargin: {
    marginLeft: '18px',
  },
  fullNameStyle: {
    width: '100%',
    textAlign: 'center',
  },
  logoutButton: {
    margin: '10px',
    textAlign: 'center',
  },
  loginButton: {
    textDecoration: 'inherit',
    color: 'inherit',
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const [drawerState, setDrawerState] = useState({
    left: false,
    right: false
  });
  // console.log('=== Header ===');
  // console.log(userData);

  const handleLogout = () => {
    setUserData({
      token: undefined,
      user: undefined
    })
    localStorage.setItem('auth-token', '');
    localStorage.setItem('accountType','')
    history.push('/login');
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const leftDrawerList = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
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
        {
          userData.accountType === 'Admin' ? (
            <>
              <LinkButton 
                LinkTitle='Sales platform'
                LinkUrl='/salesplatform'
                LinkIcon={<MonetizationOnIcon />}
              />
            </>
          ) : (
            <div />
          )
        }
      </List>
      <Divider />
    </div>
  );

  const rightDrawerList = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Typography variant="h6" color="inherit" className={classes.fullNameStyle}>
          {userData.fullName}
        </Typography>
        <LinkButton 
          LinkTitle='Settings'
          LinkUrl='/settings'
          LinkIcon={<SettingsIcon />}
        />
        {
          userData.accountType === 'Admin' ? (
            <>
              <LinkButton 
                LinkTitle='Manage users'
                LinkUrl='/manageusers'
                LinkIcon={<GroupIcon />}
              />
            </>
          ) : (
            <div />
          )
        }
      </List>
      <Divider />
      <div className={classes.logoutButton}>
        <Button 
          variant="outlined" 
          color="secondary" 
          fullWidth
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {
            userData.token ? (
              <>
                <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon/>
                </IconButton>
                <Link to='/' className={classes.title}>
                  <Button className={classes.title}>
                    <Typography variant="h6">
                      My store catalog
                    </Typography>
                  </Button>
                </Link>
                <IconButton onClick={toggleDrawer('right', true)}  color="inherit">
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <Link to='/' className={classes.title}>
                  <Button className={classes.title}>
                    <Typography variant="h6">
                      My store catalog
                    </Typography>
                  </Button>
                </Link>
                <Link to='/login' className={classes.loginButton}>
                  <Button className={classes.loginButton}>
                    Login
                  </Button>
                </Link>
              </>
            )
          }
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor='left'
        open={drawerState['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {leftDrawerList('left')}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor='right'
        open={drawerState['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {rightDrawerList('right')}
      </SwipeableDrawer>
    </div>
  )
}

export default Header;
