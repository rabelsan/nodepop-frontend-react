import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { deleteAd } from '../../api/adverts';
import Layout from '../layout';

function DelAdPage (props) {
  const { adId } = props.match.params;
  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    deleteAd(adId).then(setAd).catch(setError);
    return console.log(error ? error : `Ad ${adId} deleted`)
  }, []);

  const renderContent = () => {
    if (!ad) {
      return null;
    }
    return JSON.stringify(ad);
  };

  return (
    <Layout title="Advertisement DELETED!!">
      <div className="delAdPage">{renderContent()}</div>
    </Layout>
  );
}

export default DelAdPage;
