import client from './client';

const adsBaseUrl = '/apiv1';

export const getLatestads = () => {
  const url = `${adsBaseUrl}/adverts?sort=_id&order=desc`;
  return client.get(url);
};

export const getAdDetail = adId => {
  const url = `${adsBaseUrl}/adverts/${adId}`;
  return client.get(url);
};

export const createTweet = ad => {
  const url = `${adsBaseUrl}/adverts`;
  return client.post(url, ad);
};
