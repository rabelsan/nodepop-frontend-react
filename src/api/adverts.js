import client from './client';

export const getLatestAds = () => {
  const url = `/adverts`;
  return client.get(url);
};

export const getAdDetail = adId => {
  const url = `/adverts/${adId}`;
  return client.get(url);
};

export const createAd = ad => {
  const url = `/adverts`;
  return client.post(url, ad);
};

export const deleteAd = adId => {
  const url = `/adverts/${adId}`;
  return client.delete(url);
};


