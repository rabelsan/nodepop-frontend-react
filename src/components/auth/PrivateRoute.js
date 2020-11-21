import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContextConsumer } from './context';

const PrivateRoute = ({ isLogged, ...props }) =>
  isLogged ? <Route {...props} /> : <Redirect to="/login" />;

export const ConnectedToAuthPrivateRoute = props => (
  <AuthContextConsumer>
    {value => <PrivateRoute {...props} isLogged={value.isLogged} />}
  </AuthContextConsumer>
);

export default ConnectedToAuthPrivateRoute;
