import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getLatestAds } from '../../api/adverts';
import Layout from '../layout';
import Advert from './Advert';

function AdsPage() {
  const [ads, setAds] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getLatestAds().then(setAds).catch(setError);
    return console.log(error ? error : 'request completed');
  }, []);

  const renderContent = () => {
    if (!ads) {
      return null;
    }
    return ads.result.rows.map(ad => (
      <Advert key={ad._id} {...ad} history= {history} />
    ));
  };

  return (
    <Layout title="Advertisements list...">
      <div className="adsPage">{renderContent()}</div>
    </Layout>
  );
}

export default AdsPage;
