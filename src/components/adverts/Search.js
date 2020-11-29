import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getAdsTags } from '../../api/adverts';
import { Input, Radio, Select } from 'antd';
import 'antd/dist/antd.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Button from '../../components/shared/Button';
import useForm from '../../hooks/useForm';

import {FlexBoxCol, FlexBoxRow} from './styles.js';

const SliderTooltip = Slider.createSliderWithTooltip;
const Range = SliderTooltip(Slider.Range);
const {Option} = Select;

function Search() {
  const [form, handleChange] = useForm({name: '', slider: [], tags: [], sale: true});
  const [submitting, setSubmitting] = useState(false);
  const [tags, setTags] = useState(null);

  const minRange = 0;
  const maxRange = 100000;
  let slider = [minRange,maxRange];
  let history = useHistory();
  const children = [];
   

  useEffect(() => {
    let error=null;   
    getAdsTags().then(setTags).catch(error);
    return console.log(error ? error : 'Tags request completed');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tags) {
    for (let i = 0; i < tags.result.length; i++ ) {
        children.push(<Option key={i}>{tags.result[i]}</Option>);
    }
    }
  }, [tags]);

  function onSliderChange (value) {
    form.slider=value;
  };
  
  function handleClickSearch(event) {
    setSubmitting(true);
    history.push(`/adverts?price=${slider[0]}-${slider[1]}${form.name ? `&name=${form.name}`: ''}`);
    setSubmitting(false);
  }

  function handleSelectChange(value) {
    console.log(`selected ${value}`);
  }
  
  return (
    <div>
      <FlexBoxRow style={{border: '1px solid grey', padding: '5px'}}>
        <div>
          <p className="advert-item">Advert name</p>
          <Input value={form.name} name="name" vale={form.name} onChange={handleChange} placeholder="Name filter" />
          <p className="advert-item">Price range ({minRange}-{maxRange}):</p>
          {/* <Range
            className='slider'
            min={minRange}
            max={maxRange}
            value={slider}
            dots 
            ticks
            onChange={onSliderChange}
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
          />  */}
        </div>
        <div>
          <p>Sale/Buy</p>
          <Radio name="sale" checked={form.sale} onChange={handleChange}>For sale</Radio>
          <p>Tags</p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={[]}
            onChange={handleSelectChange}
          >
            {children}
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