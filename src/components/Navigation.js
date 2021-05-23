/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithSubRoutes = ({ path, component: Component, routes }) => (
  <Route
    path={path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <Component {...props} routes={routes} />
    )}
  />
);

RouteWithSubRoutes.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  routes: PropTypes.array,
};
RouteWithSubRoutes.defaultProps = {
  routes: [],
};

export default RouteWithSubRoutes;
