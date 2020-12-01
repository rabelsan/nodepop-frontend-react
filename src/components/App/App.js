import React, { useState } from 'react';
import T from 'prop-types';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import AdsPage from '../adverts/AdsPage';
import AdPage from '../adverts/AdPage';
import AdTags from '../adverts/AdTags';
import NewAdPage from '../adverts/NewAdPage';
import LoginPage from '../auth/LoginPage';
import PrivateRoute from '../auth/PrivateRoute';
import { AuthContextProvider } from '../auth/context';

function App ({ initiallyLoggedUserId }) {
  const [loggedUserId, setLoggedUserId] = useState(initiallyLoggedUserId);
  
  const handleLogin = loggedUserId => 
    new Promise(resolve => {
      setLoggedUserId(loggedUserId);
      resolve()
    });
  
  const handleLogout = () => setLoggedUserId(null);

  const history = useHistory(); 
  //const params = new URLSearchParams(history.location.search);
  console.log('history.location.search: ',history.location.search);
    

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
          <PrivateRoute path="/newAd" exact>
            <NewAdPage />
          </PrivateRoute>
          <PrivateRoute path="/adverts/tags" exact component={AdTags}/>
          <PrivateRoute path="/adverts/:adId" exact component={AdPage} />
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
