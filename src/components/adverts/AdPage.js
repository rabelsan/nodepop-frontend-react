import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import Button from '../../components/shared/Button';
import { Modal, Popconfirm } from 'antd';
import 'antd/dist/antd.css';

import { getAdDetail } from '../../api/adverts';
import { deleteAd } from '../../api/adverts';

import {FlexBoxCol} from './styles.js';
import './AdPage.css';

function AdPage (props) {
  const { adId } = props.match.params;
  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null);
  const { REACT_APP_BACK_URL: urlBackend} = process.env;
  console.log(process.env);
  
  useEffect(() => {
    getAdDetail(adId).then(setAd).catch(setError);
    return console.log(error ? error : 'request completed');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClickDelete(event) {
    deleteAd(adId).then(setAd).catch(setError);
    console.log(error ? error : `Ad ${adId} deleted`);
    success();
    props.history.push('/adverts');
  }

  function success() {
    Modal.success({
      title: 'Delete advert',
      content: `Advert '${ad.result.name}', deleted!`,
      destroyOnClose: true,
    });
  }

  const renderContent = () => {
    if (!ad) {
      return null;
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
                <img class='image' src={urlBackend + ad.result.photo} alt={urlBackend + ad.result.photo}/>
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

export default AdPage;
