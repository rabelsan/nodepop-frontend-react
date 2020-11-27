import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { getAdDetail } from '../../api/adverts';
import Layout from '../layout';
import Button from '../../components/shared/Button';

function AdPage (props) {
  const { adId } = props.match.params;
  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    getAdDetail(adId).then(setAd).catch(setError);
    return console.log(error ? error : 'request completed');
  }, []);

  const renderContent = () => {
    if (!ad) {
      return null;
    }
    return (
        
        <React.Fragment>
          {JSON.stringify(ad)}
          <div>
            <Button 
              as={Link} 
              to={`/delAd/${adId}`}
              variant="primary"
              className="delete-button"
            >
              Delete
            </Button>
          </div>
        </React.Fragment>
    );
  };

  return (
    <Layout title="Advertisement Details">
      <div className="adPage">{renderContent()}</div>
    </Layout>
  );
}

export default AdPage;
