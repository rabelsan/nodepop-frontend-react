import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getLatestAds } from '../../api/adverts';
import Layout from '../layout';
import Advert from './Advert';
import Search from './Search';

import './AdsPage.css';

function AdsPage() {
  const [ads, setAds] = useState(null);
  
  let history = useHistory();

  useEffect(() => {
    let error=null;
    getLatestAds().then(setAds).catch(error);
    return console.log(error ? error : 'Ads request completed');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div>
        <Search />
      </div>
      <div className="adverts-list">{renderContent()}</div>
    </Layout>
  );
}

export default AdsPage;
