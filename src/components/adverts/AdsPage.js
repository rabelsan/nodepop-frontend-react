import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getLatestAds } from '../../api/adverts';
import Layout from '../layout';
import Advert from './Advert';
import Button from '../../components/shared/Button';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {FlexBoxCol, FlexBoxRow} from './styles.js';
import './AdsPage.css';

function AdsPage() {
  const [ads, setAds] = useState(null);
  const [error, setError] = useState(null);
  const minRange = 0;
  const maxRange = 100000;
  const [slider, setSlider] = useState([minRange,maxRange]);
  const history = useHistory();
  const SliderTooltip = Slider.createSliderWithTooltip;
  const Range = SliderTooltip(Slider.Range);
  
  function onSliderChange (value) {
    setSlider(value);
  };

  useEffect(() => {
    getLatestAds().then(setAds).catch(setError);
    return console.log(error ? error : 'request completed');
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
        <FlexBoxRow style={{border: '1px solid grey', padding: '5px'}}>
          <div>
            <p>Advert name</p>
           
            <p>Price range ({minRange}-{maxRange}):</p>
            <Range
              className='slider'
              min={minRange}
              max={maxRange}
              value={slider}
              dots 
              ticks
              displayFollowerPopover
              //markerLabel={[minRange : "min", {maxRange} : "max"]}
              onChange={onSliderChange}
              onAfterChange={onSliderChange}
              railStyle={{
                height: 2
              }}
              handleStyle={{
                height: 20,
                width: 20,
                marginLeft: 0,
                marginTop: -7,
                backgroundColor: "green",
                border: 100
              }}
              trackStyle={{
                background: "none"
              }}
            />
          </div>
          <div>
            <p>dfsdf</p>
            <p>otro</p>
          </div>
        </FlexBoxRow>
        <FlexBoxCol>
          <Button variant="primary"> Search</Button>
        </FlexBoxCol>
      </div>
      <div className="adverts-list">{renderContent()}</div>
    </Layout>
  );
}

export default AdsPage;
