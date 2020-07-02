import React from 'react';
import { makeStyles } from '@material-ui/core';
import PageTitle from '../../Components/Layout/PageTitle';
import ListCard from '../../Components/Layout/ListCard';

const useStyles = makeStyles((theme)=> ({
  root: {
    height: '100%',
  },
  listRoot: {
    overflowY: 'scroll',
    height: 'calc(100% - 62px - 50px)',
  },
}));

const CatalogList = ({catalogItems, handleSelectitemChange, selectedItem }) => {
  const classes = useStyles();

  const displayList = catalogItems.map((value, key) => {
    return (
      <ListCard
        key={key}
        id={value._id}
        title={value.partNumber}
        subTitle={value.description}
        handleSelectitemChange={() => handleSelectitemChange(value)}
        value={value}
        selectedItem={selectedItem}
      />
    )
  });

  return (
    <div className={classes.root}>
      <PageTitle title="Catalog" variant="h4" />
      <div className={classes.listRoot}>
        {displayList}
      </div>
    </div>
  )
}

export default CatalogList;
