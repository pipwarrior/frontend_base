import React from 'react';
import CatalogMaximise from './CatalogMaximise';
import CatalogMinimise from './CatalogMinimise';

import isMobile from '../../Utilities/isMobile';

const Catalog = (props) => {

  const selectedItem = props.location.selectedItem;

  if(isMobile.any()){
    return (
      <CatalogMinimise 
        showRedirect={selectedItem}
      />
    )
  }

  return (
    <CatalogMaximise 
      showRedirect={selectedItem}
    />
  )
}

export default Catalog;