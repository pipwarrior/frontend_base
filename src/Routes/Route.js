import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RouteWrapper = ({
  component: Component,
  isLoginPage,
  isPrivate,
  isAdminOnly,
  ...rest
}) => {
  const signed = localStorage.getItem('auth-token');
  const accountType = localStorage.getItem('accountType');
  
  if (isLoginPage && signed && accountType) {
    return <Redirect to="/catalog" />
  }

  // Route is private and the user is not logged in
  if (isPrivate && !signed) {
    return <Redirect to="/login" />;
  }

  if(isAdminOnly && accountType !== "Admin"){
    return <Redirect to="/" />;
  }

  return (
    <Route {...rest} component={Component} />
  )
}

export default RouteWrapper;

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

RouteWrapper.defaultProps = {
  isPrivate: false
}
