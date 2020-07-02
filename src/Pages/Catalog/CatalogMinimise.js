import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, Typography,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  Table, TableBody, TableRow, TableCell, Grid
} from '@material-ui/core';
import axios from 'axios';
import PageTitle from '../../Components/Layout/PageTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CatalogOptions from './CatalogOptions';
import UserContext from '../../context/UserContext';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansionPanalRoot: {
    margin: '0px 10px 0px 10px',
    boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.6)',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  main: {
    overflowY: 'scroll',
    height: 'calc(100vh - 62px - 50px)',
  }
}));

const CatalogMinimise = ({showRedirect}) => {
  const classes = useStyles();
  const history = useHistory();
  const [catalogItems, setCatalogItems] = useState([]);
  const { userData } = useContext(UserContext);

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

  const displayList = catalogItems.map((value, key) => {
    let title = value.partNumber;
    if (title.length !== 1) {
      title = title.join(', ');
    }
    const displayPartNumber = value.partNumber.map((value, key) => {
      return (
        <Typography key={key}>{value}</Typography>
      )
    })
    return (
      <ExpansionPanel className={classes.expansionPanalRoot} key={key}>
        <ExpansionPanelSummary
          expandIcon={
            <ExpandMoreIcon />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid
            justify="space-between" // Add it here :)
            container 
            spacing={1}
            alignItems="center"
          >
            <Grid item xs={10}>
              <Typography className={classes.heading}>
                <strong>{title}</strong>
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <CatalogOptions selectedItem={value} />
            </Grid>
          </Grid>
          {/* <Typography className={classes.heading}>
            <strong>{title}</strong>
          </Typography> */}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>
                  <Typography>{value.category}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>
                  <Typography>{value.brand}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Part number</TableCell>
                <TableCell>
                  {displayPartNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>
                  <Typography>{value.description}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  });

  return (
    <div className={classes.root}>
      <PageTitle title="Catalog" variant="h4" />
      <div className={classes.main}>
        {displayList}
      </div>

      {
        userData.accountType === 'Admin' ? (
          <Fab color="primary" className={classes.fab}>
            <AddIcon 
              onClick={() => {
                history.push({
                  pathname: '/catalog/form',
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

export default CatalogMinimise;
