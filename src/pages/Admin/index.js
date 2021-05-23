import RouteWithSubRoutes from 'components/Navigation';
import React from 'react';
import { Switch } from 'react-router-dom';

const Admin = ({ routes }) => (
  <Switch>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
  </Switch>
);

export default Admin;
