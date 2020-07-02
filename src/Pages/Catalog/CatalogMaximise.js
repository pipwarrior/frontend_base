import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core'; 
import UserContext from '../../context/UserContext';
import axios from 'axios';
import CatalogList from './CatalogList';
import CatalogItemDetail from './CatalogItemDetail';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme)=> ({
  root: {
    display: 'flex',
  },
  leftPanel: {
    width: '35vw',
    minWidth: '350px',
    height: 'calc(100vh - 60px)',
    borderRight: '1px solid #C0C0C0',
    backgroundColor: '#F5F5F5',
  },
  rightPanel: {
    width: '65vw',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#F5F5F5',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '30%',
  },
}));

const CatalogMaximise = ({showRedirect}) => {
  const classes = useStyles();
  const history = useHistory();
  const { userData } = useContext(UserContext);
  const [catalogItems, setCatalogItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(showRedirect);

  useEffect(() => {
    axios({
      method:'get',
      url: process.env.REACT_APP_API+'/api/inventory',
      headers: {'auth-token': localStorage.getItem('auth-token')}
    }).then(function(inventory){
      setCatalogItems(inventory.data);
    }).catch(function(err){
      console.log(err);
    })
  }, []);

  const handleSelectitemChange = (item) => {
    setSelectedItem(item);
  }

  return (
    <div className={classes.root}>
      <div className={classes.leftPanel}>
        <CatalogList
          catalogItems={catalogItems} 
          handleSelectitemChange={(item) => handleSelectitemChange(item)}
          selectedItem={selectedItem}
        />
      </div>
      <div className={classes.rightPanel}>
        <CatalogItemDetail
          selectedItem={selectedItem}
        />
      </div>
      {
        userData.accountType === 'Admin' ? (
          <Fab color="primary" className={classes.fab}>
            <AddIcon 
              onClick={() => {
                history.push({
                  pathname: '/catalog/form',
                  selectedItem: selectedItem,
                  isEdit: false
                });
              }}
            />
          </Fab>
        ) : (
          <></>
        )
      }
    </div>
  )
}

export default CatalogMaximise;
