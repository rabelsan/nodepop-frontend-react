import React from 'react';
import T from 'prop-types';

import 'antd/dist/antd.css';
import { Card } from 'antd';
import './Advert.css'

const { Meta } = Card;


const Advert = ({ photo, name,  price, tags, sale, _id, history }) => (
  <article
    className="advert"
    onClick={() => history.push(`/adverts/${_id}`)}
  >
    <div className="site-card-wrapper">
      <Card style={{backgroundColor: 'rgb(98,  189, 89)'}}>
        <Meta 
          style={{ margin: '10px 0px'}} 
          title={sale ? `For sale: ${name}`: `To buy: ${name}`}  
        />
          <h4 style={{color: 'red'}}>Price: {price}</h4>
          <h4 style={{color: 'white'}}> Tags:{tags.map(tag => ` ${tag}`)}</h4>
      </Card>
    </div>
  </article>
);

Advert.propTypes = {
  photo: T.string,
  name: T.string.isRequired,
  price: T.number.isRequired,
  tags: T.array.isRequired,
  sale: T.bool.isRequired,
  history: T.shape({ push: T.func.isRequired }).isRequired,
};

Advert.defaultProps = {
  content: 'Nothing here!',
};

export default Advert;
