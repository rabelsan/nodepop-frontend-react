import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import Button from '../shared/Button';
import { Modal, Popconfirm } from 'antd';
import 'antd/dist/antd.css';

import { getAdDetail } from '../../api/adverts';
import { deleteAd } from '../../api/adverts';

import {FlexBoxCol} from './styles.js';
import './AdvertPage.css';

function AdvertPage (props) {
  const { adId } = props.match.params;
  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null);
  const { REACT_APP_BACK_URL: urlBackend} = process.env;
  
  useEffect(() => {
    getAdDetail(adId).then(setAd).catch(setError);
    return console.log(error ? error : 'request completed');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickDelete = (event) => {
    deleteAd(adId).then( resolve => {
      props.history.push('/adverts');
    }).catch( reject => {
      setError(reject);
      failure();
    });
  }

  const failure = (reject) => {
    Modal.success({
      title: 'Delete advert rejected',
      content: `Error: '${error}`,
      destroyOnClose: true,
    });
  }

  const renderContent = () => {
    if (!ad) {
      return <div>Advert id '{adId}'.... NOT FOUND!</div>;
    }
    return (
        <React.Fragment>
          <div className="content">  
            <article className="advert-details">
              <div>
                <h4>{ad.result.name}</h4>
                <h3>{ad.result.sale ? 'For sale' : 'To buy'}</h3>
                <h4>Price: {ad.result.price}</h4>
                <h5>Tags:{ad.result.tags.map(tag => ` ${tag}`)}</h5>
              </div>
              <div className="img-frame">
                <img className='image' src={urlBackend + ad.result.photo} alt={urlBackend + ad.result.photo}/>
              </div>
            </article>
          </div>
          <div>
            <FlexBoxCol>
              < Popconfirm 
                title=" Are you sure delete this advertisement? "
                name="delete"
                placement="topRight"
                onConfirm={handleClickDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button variant="primary"> Delete</Button>
              </Popconfirm>
            </FlexBoxCol>
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

export default AdvertPage;
