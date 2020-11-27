import React from 'react';

import T from 'prop-types';

import './Advert.css';

const Advert = ({ photo, name,  price, tags, sale, _id, history }) => (
  <article
    className="advert bordered"
    onClick={() => history.push(`/adverts/${_id}`)}
  >
    <div className="left">
      {/* <Photo src={defaultPhoto} className="advert-photo" /> */}
    </div>
    <div className="right">
      <div className="advert-header">
        <span className="advert-sale">{sale ? 'On sale' : 'To buy'}</span>
        <span className="advert-name">{name}</span>
        <span className="advert-price">{price}</span>
        <span className="advert-photo">{photo}</span>
        <span className="advert-separator">·</span>
      </div>
      <div>
        {tags}
        <div className="advert-actions"></div>
      </div>
    </div>
  </article>
);

Advert.propTypes = {
  foto: T.string,
  nombre: T.string.isRequired,
  precio: T.number.isRequired,
  tags: T.array.isRequired,
  venta: T.bool.isRequired,
  history: T.shape({ push: T.func.isRequired }).isRequired,
};

Advert.defaultProps = {
  content: 'Nothing here!',
};

export default Advert;
