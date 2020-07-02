import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { makeStyles, Menu, MenuItem  } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
  linkDecoration: {
    textDecoration: 'inherit',
    color: 'inherit',
  },
}));

const CatalogOptions = ({selectedItem}) => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleMoreIconClicked = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    axios({
      method:'delete',
      url: process.env.REACT_APP_API+'/api/inventory',
      data: selectedItem,
      headers: {'auth-token': localStorage.getItem('auth-token')}
    }).then(function(deletedInventory){
      console.log(deletedInventory);
      if (deletedInventory.data.message === "Successfully deleted") {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          showConfirmButton: false,
          timer: 1500
        }).then(function(){
          history.go(0);
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: deletedInventory.data.error,
          confirmButtonText: 'Ok'
        })
      }
    }).catch(function(err){
      console.log(err);
    })
  }

  if (userData.accountType !== 'Admin') {
    return <></>
  }

  return (
    <>
      <IconButton aria-label="settings" onClick={handleMoreIconClicked}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link 
          to={{
            pathname:"/catalog/form",
            selectedItem: selectedItem,
            isEdit: true
          }} 
          className={classes.linkDecoration}
        >
          <MenuItem onClick={handleClose}>
            Edit
          </MenuItem>
        </Link>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  )
}

export default CatalogOptions;
