import React from 'react';
import T from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './Advert.css';
 
const Advert = ({ user, createdAt, content, history, id }) => (
  <article
    className="advert bordered"
    onClick={() => history.push(`/adverts/${id}`)}
  >
    <div className="left">
      {/* <Photo src={defaultPhoto} className="advert-photo" /> */}
    </div>
    <div className="right">
      <div className="advert-header">
        <span className="advert-name">{user.name}</span>
        <span className="advert-username">{user.username}</span>
        <span className="advert-separator">·</span>
        <time dateTime={createdAt}>
          {formatDistanceToNow(new Date(createdAt))}
        </time>
      </div>
      <div>
        {content}
        <div className="advert-actions"></div>
      </div>
    </div>
  </article>
);

Advert.propTypes = {
  user: T.shape({ name: T.string.isRequired, username: T.string.isRequired })
    .isRequired,
  createdAt: T.string.isRequired,
  content: T.string,
  history: T.shape({ push: T.func.isRequired }).isRequired,
};

Advert.defaultProps = {
  content: 'Nothing here!',
};

export default Advert;
