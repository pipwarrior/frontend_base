import React from 'react';
import { makeStyles, Typography, Card, CardHeader, CardContent, Grid } from '@material-ui/core';
import CatalogOptions from './CatalogOptions';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    margin: '10px',
    maxHeight: '737px',
    boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.6)',
  },
  cardContentRoot: {
    overflowY: 'scroll',
    maxHeight:'662px',
    paddingTop: '0',
  },
}));

const CatalogItemDetail = ({display, selectedItem}) => {
  const classes = useStyles();

  if(!selectedItem || display){
    return <div />
  }

  let title = selectedItem.partNumber;
  if (title.length !== 1) {
    title = title.join(', ');
  }
  
  return (
    <div className={classes.root}>
      <Card className={classes.cardRoot}>
        <CardHeader
          title={title}
          subheader="Price: $10"
          action={
            <CatalogOptions selectedItem={selectedItem} />
          }
        />
        <CardContent className={classes.cardContentRoot}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={2} align="left">
              <Typography variant="body2" display="block" gutterBottom>
                Description:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} align="left">
              <Typography variant="body2" display="block" gutterBottom>
                {selectedItem.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} align="left">
              <Typography variant="body2" display="block" gutterBottom>
                Product category:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} align="left">
              <Typography variant="body2" display="block" gutterBottom>
                {selectedItem.category}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} align="left">
              <Typography variant="body2" display="block" gutterBottom>
                Product brand:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} align="left">
              <Typography variant="body2" display="block" gutterBottom>
                {selectedItem.brand}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs={12} sm={6} align="left">
              <Typography variant="overline" display="block" gutterBottom>
                Created on: {selectedItem.createdOn}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} align="right">
              <Typography variant="overline" display="block" gutterBottom>
                Updated on: {selectedItem.updatedOn}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default CatalogItemDetail
