import React, { useState } from 'react';
import T from 'prop-types';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import AdvertsPage from '../adverts/AdvertsPage';
import AdvertPage from '../adverts/AdvertPage';
import AdvertTags from '../adverts/AdvertTags';
import NewAdvertPage from '../adverts/NewAdvertPage';
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
  
  const {pathname, search} = useLocation();

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
        <PrivateRoute path="/advert/new" exact>
            <NewAdvertPage />
          </PrivateRoute>
          <PrivateRoute path="/advert/:adId" exact component={AdvertPage} />
          <PrivateRoute path="/" exact>
            <Redirect to="/adverts" />
          </PrivateRoute>
          <PrivateRoute path="/adverts" exact>
            <AdvertsPage query={pathname + search}/>
          </PrivateRoute>
          <PrivateRoute path="/adverts/tags" exact component={AdvertTags}/>
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
