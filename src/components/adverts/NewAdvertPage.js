import React, { useState, useEffect, createRef } from 'react';
import { useHistory } from 'react-router-dom';

import { getAdsTags, createAd } from '../../api/adverts';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Radio, Select, Space, Modal, Image, Upload , Button} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Layout from '../layout';
import CustomButton from '../shared/Button';
import defaultImg from '../../assets/defaultImg.jpg';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 12,
  },
};


const NewAdvertPage = () => {
  const [form] = Form.useForm();
  const imgRef = createRef();
  const [submitting, setSubmitting] = useState(false);
  const [apiTags, setApiTags] = useState(null);
  const [options, setOptions] = useState([]);
  const [radio, setRadio] = useState(true);
  const [upload, setUpload] = useState({
    selectedFile: null,
    selectedFileList: [],
  });
  const [photo, setPhoto] = useState(defaultImg);

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

  const onChangeRadio = e => {
    setRadio(e.target.value);
  };

  const onFinish = (values) => {
    setSubmitting(true);
    values.photo = imgRef.src;
    console.log(values);
    createAd(values).then( resolve => {
      history.push(`/advert/${resolve.result._id}`);
    }).catch( reject => {
      failure(reject);
    });
    setSubmitting(false);
  };

  const failure = (reject) => {
    Modal.failure({
      title: 'New advert failure',
      content: `Sorry, internal error: '${reject}`,
      destroyOnClose: true,
    });
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  
  const handleFileChange = info => {
    const nextState = {};
    switch (info.file.status) {
      case "uploading":
        nextState.selectedFileList = [info.file];
        break;
      case "done":
        nextState.selectedFile = info.file;
        nextState.selectedFileList = [info.file];
        break;
      default:
        // error or removed
        nextState.selectedFile = null;
        nextState.selectedFileList = [];
    }
    setUpload(nextState);
  };

  const renderContext = () => {
    return (
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{sale: true}}>
      <Space direction="horizontal" align="block">
        <Space direction="vertical" align="start">  
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Advert title" style={{ width: '250px' }} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber placeholder="Price" style={{ width: '250px' }} min={1} precision={0} step={1} max={25000}/>
          </Form.Item>
          <Form.Item
            name="tags"
            label="Tags"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '250px' }}
              placeholder="Please select advert tags"
              initialvalues={[]}
              maxTagTextLength="10"
            >
              {options}
            </Select>
          </Form.Item>
          <Form.Item
            name="sale"
            label="Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group onChange={onChangeRadio} value={radio} style={{ width: '250px' }}>
              <Radio value={true}>For Sale</Radio>
              <Radio value={false}>To Buy</Radio>
            </Radio.Group>
          </Form.Item>
        </Space>
        <Space direction="vertical" align="start">
          <Form.Item
            name="photo"
          >
            <Image
              ref = {imgRef}
              style={{ margin: '0px 15px' }}
              width={200}
              height={200}
              src={photo}
              fallback={defaultImg}
            />
          </Form.Item>
          <Upload 
            accept="image/*"
            fileList={upload.selectedFileList}
            customRequest={dummyRequest}
            onChange={handleFileChange}
            width={80}
            height={80}
            showUploadList={false}
            beforeUpload={file => {
              const reader = new FileReader();
              reader.onload = e => {
                  setPhoto(e.target.result);
              };
              reader.readAsDataURL(file);
          }}
          >
            <Button icon={<UploadOutlined />} style={{ margin: '0px 15px' }}>Upload</Button>
          </Upload>
        </Space>
      </Space>
      <Form.Item {...tailLayout}>
        <CustomButton variant="primary" disable={!submitting} htmlType="submit" style={{ margin: '15px' }}>
          Submit
        </CustomButton>
      </Form.Item>
    </Form>
    );
  };

  return (
    <Layout title="New Advertisement...">
      <div className="adverts-list">{renderContext()}</div>
    </Layout>
  );
}

export default NewAdvertPage;