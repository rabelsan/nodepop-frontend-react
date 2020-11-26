import React, { useState } from 'react';
import T from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import AdsPage from '../adverts/AdsPage';
import NewAdPage from '../adverts/NewAdPage';
import LoginPage from '../auth/LoginPage';
import PrivateRoute from '../auth/PrivateRoute';
import { AuthContextProvider } from '../auth/context';
import Advert from '../adverts/Advert';

function App ( { initiallyLoggedUserId }) {
  const [loggedUserId, setLoggedUserId] = useState(initiallyLoggedUserId);
  
  const handleLogin = loggedUserId => 
    setLoggedUserId(loggedUserId);

  const handleLogout = () => setLoggedUserId(null);

  return (
    <AuthContextProvider
      value={{
        isLogged: !!loggedUserId,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      <div className="App">
        <Switch>
          <PrivateRoute path="/" exact>
            <Redirect to="/adverts" />
          </PrivateRoute>
          <PrivateRoute path="/adverts" exact>
            <AdsPage/>
          </PrivateRoute>
          <PrivateRoute path="/ad" exact>
              <NewAdPage />
          </PrivateRoute>
          <Route path="/adverts/:adId" exact component={Advert} />
          <Route path="/login" exact>
            {({ history }) => (
              <LoginPage onLogin={handleLogin} history={history} />
            )}
          </Route>
          <Route path="/404" exact>
            <div
              style={{
                textAlign: 'center',
                fontSize: 48,
                fontWeight: 'bold',
              }}
            >
              404 | Not found page
            </div>
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </AuthContextProvider>
  );
}

App.propTypes = {
  initiallyLooggedUserId: T.string,
};

export default App;
