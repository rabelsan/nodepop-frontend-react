import client from './client';

import storage from '../utils/storage';

export const login = crendentials =>
  client.login(crendentials).then(auth => {
    const { token } = auth;
    if (crendentials.remember) {
      storage.set('auth', { token });
    } else {
      storage.remove('auth');
      storage.remove('search');
    }
    return auth.token;
  });

export const logout = () =>
  client.logout().then(() => {
    storage.remove('auth');
    storage.remove('search');
  });
