import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getLatestAds } from '../../api/adverts';
import Layout from '../layout';
import Advert from './Advert';

function AdsPage() {
  const [ads, setAds] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getLatestAds().then(setAds);
    return () => {
      // cancel request
      console.log('cancel request');
    };
  }, []);

  const renderContent = () => {
    if (!ads) {
      return null;
    }
    return ads.map(ad => (
      <Advert key={ad.id} {...ad} history={history} />
    ));
  };

  return (
    <Layout title="What's going on...">
      <div className="tweetsPage">{renderContent()}</div>
    </Layout>
  );
}

export default AdsPage;
