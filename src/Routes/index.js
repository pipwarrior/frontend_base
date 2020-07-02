import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../Pages/home';

import Catalog from '../Pages/Catalog/Catalog';
import CatalogForm from '../Pages/Catalog/CatalogForm';

import Settings from '../Pages/settings/settings';
import ManageUsers from '../Pages/manageUsers/ManageUsers';
import SalesPlatform from '../Pages/salesPlatform/SalesPlatform';
import Login from '../Pages/auth/login';

// import UserContext from '../context/UserContext';

const Routes = () => {
  // const { userData } = useContext(UserContext);
  // console.log('--- Routes ---');
  // console.log(userData);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} isLoginPage />
      
      <Route path="/catalog" exact component={Catalog} isPrivate />
      <Route path="/catalog/form" component={CatalogForm} isPrivate isAdminOnly />

      <Route path="/settings" component={Settings} isPrivate />

      <Route path="/salesplatform" component={SalesPlatform} isPrivate isAdminOnly />
      <Route path="/manageusers" component={ManageUsers} isPrivate isAdminOnly />

      <Route path="/" component={Home} />
    </Switch>
  )
}

export default Routes;
