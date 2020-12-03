import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getAdsTags } from '../../api/adverts';
import 'antd/dist/antd.css';
import { Input, Radio, Select } from 'antd';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Button from '../../components/shared/Button';
import useForm from '../../hooks/useForm';

import {FlexBoxCol, FlexBoxRow} from './styles.js';

const SliderTooltip = Slider.createSliderWithTooltip;
const Range = SliderTooltip(Slider.Range);
const { Option } = Select;
const minRange = 0;
const maxRange = 25000;

function Search() {
  const [form, handleChange] = useForm({name: '', sale: 3});
  const [slider, setSlider] = useState([minRange, maxRange]);
  const [submitting, setSubmitting] = useState(false);
  const [apiTags, setApiTags] = useState(null);
  const [selTags, setSelTags] = useState([]);
  const [options, setOptions] = useState([]);

  let history = useHistory();
  let children = [];
  

  useEffect(() => {
    let error=null;   
    getAdsTags().then(setApiTags).catch(error);
    return console.log(error ? error : 'Tags request completed');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (apiTags) {
      for (let i = 0; i < apiTags.result.length; i++ ) {
        children.push(<Option key={apiTags.result[i]}>{apiTags.result[i]}</Option>);
      }
      setOptions(children);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiTags]);

  function handleSelectChange(value) {
    setSelTags(value);
  }

  function onSliderChange (value) {
    setSlider(value);
  };
  
  function handleClickSearch(event) {
    setSubmitting(true);
    var searchParams = new URLSearchParams();
    if (form.name) {
      searchParams.append('name', form.name);
    }
    if (form.sale<3) {
      searchParams.append('sale', (form.sale<2) ? 'true' : 'false');
    }
    if (selTags.join(',').length) {
      searchParams.append('tags', selTags.join(','));
    }
    // Apply price filters only if user changes min/max limits
    if (slider[0]>minRange || slider[1]<maxRange) {
      searchParams.append('price',slider[0] + '-' + slider[1]);
    }
    if (searchParams.toString().length) {
      history.push('/adverts?' + searchParams.toString());
    } else {
      history.push('/adverts');
    } 
    setSubmitting(false);
  }

  return (
    <div>
      <FlexBoxRow style={{border: '1px solid grey', padding: '5px'}}>
        <div>
          <p className="advert-item">Advert name</p>
          <Input  
            name="name"
            value={form.name}
            onChange={handleChange} 
            placeholder="Name filter" />
          <p className="advert-item">Price (move to filter) [{minRange}-{maxRange}]:</p>
          <Range
            className='slider'
            min={minRange}
            max={maxRange}
            value={slider}
            onChange={onSliderChange}
            railStyle={{
              height: 3
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
          {/* <Radio name="sale" checked={form.sale} onChange={handleChange}>For sale</Radio> */}
          <p>Sale/Buy/All ads</p>
          <Radio.Group name="sale" onChange={handleChange} value={form.sale}>
            <Radio value={1}>For Sale</Radio>
            <Radio value={2}>To Buy</Radio>
            <Radio value={3}>All</Radio>
          </Radio.Group>
          <p>Tags</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '250px' }}
            placeholder="Please select tags to filter"
            defaultValue={[]}
            onChange={handleSelectChange}
            maxTagTextLength="10"
          >
            {options}
          </Select>
        </div>
      </FlexBoxRow>
      <FlexBoxCol>
        <Button variant="primary" onClick={handleClickSearch} disable={!submitting}> Search</Button>
      </FlexBoxCol>
    </div>
  );
}

export default Search;