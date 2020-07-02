import React from 'react';
import CatalogMaximise from './CatalogMaximise';
import CatalogMinimise from './CatalogMinimise';

const Catalog = (props) => {
  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

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