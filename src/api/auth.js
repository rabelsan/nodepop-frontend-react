import client from './client';

import storage from '../utils/storage';

export const login = crendentials =>
  client.login(crendentials).then(auth => {
    const { id, accessToken } = auth;
    storage.set('auth', { id, accessToken });
    return auth.id;
  });

export const logout = () =>
  client.logout().then(() => {
    storage.remove('auth');
  });
