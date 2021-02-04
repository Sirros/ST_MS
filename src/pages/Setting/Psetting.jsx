import React, { Component } from 'react';
import ImgCrop from 'antd-img-crop';
import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Form, Input, InputNumber, Button, Upload, Image, message, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

// 表单布局
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 12,
  },
};

// 地区
const provinceData = ['四川', '广东'];
const cityData = {
  四川: ['成都', '乐山', '郫县'],
  广东: ['广州', '深圳', '东莞'],
};

// 头像 func
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class PSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: true,
      loading: false,
      province: provinceData[0],
      cities: cityData[provinceData[0]],
      city: cityData[provinceData[0]][0],
    };
  }
  formRef = React.createRef();

  // 头像选择
  handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  // 重置
  onReset = () => {
    this.formRef.current.resetFields();
    this.setState({
      imageUrl: '',
    });
  };

  // 提交
  onFinish = (v) => {
    const { imgList, province, cities, city } = this.state;
    v = { ...v, imgList, area: { province, city } };
    console.log(v);
  };
  // 省份修改
  handleProvinceChange = (value) => {
    console.log('===', value);
    this.setState({
      cities: cityData[value],
      province: value,
      city: cityData[value][0],
    });
  };
  // 城市修改
  onCityChange = (value) => {
    this.setState({
      city: value,
    });
  };

  render() {
    const { loading, imageUrl, cities, city } = this.state;
    const { formRef, onFinish, handleProvinceChange, onCityChange, handleUploadChange } = this;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <PageContainer>
        <Card>
          <Form
            {...layout}
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
            initialValues={{
              name: 'raj',
              id: '121970263',
              area: '',
              message: '',
              opinion: '',
              size: '',
            }}
          >
            <Form.Item label="姓名" name="name">
              <Input disabled style={{ width: '25%' }} />
            </Form.Item>
            <Form.Item label="学号" name="id">
              <Input disabled style={{ width: '25%' }} />
            </Form.Item>
            <Form.Item label="球衣号码" name="number" rules={[{ required: false }]}>
              <InputNumber min={0} max={99} placeholder="请输入球衣号码" style={{ width: '25%' }} />
            </Form.Item>
            <Form.Item label="球衣码数" name="size" rules={[{ required: false }]}>
              <Input style={{ width: '25%' }} min={0} max={6} placeholder="请输入球衣码数" />
            </Form.Item>
            <Form.Item label="头像" rules={[{ required: false }]}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="" // url
                beforeUpload={beforeUpload}
                onChange={handleUploadChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
             <Form.Item label="地区" name="area" rules={[{ required: false }]}>
              <>
                <Select
                  defaultValue={provinceData[0]}
                  style={{ width: 120 }}
                  onChange={handleProvinceChange}
                >
                  {provinceData.map((province) => (
                    <Option key={province}>{province}</Option>
                  ))}
                </Select>
                <Select style={{ width: 120 }} value={city} onChange={onCityChange}>
                  {cities.map((city) => (
                    <Option key={city}>{city}</Option>
                  ))}
                </Select>
              </>
            </Form.Item>
            <Form.Item label="留言" name="message" rules={[{ required: false }]}>
              <Input placeholder="将会展示于首页" allowClear />
            </Form.Item>
            <Form.Item label="意见" name="opinion" rules={[{ required: false }]}>
              <TextArea allowClear placeholder="针对队伍的管理，请提出您的宝贵意见！" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                提交
              </Button>
              <Button htmlType="button" onClick={this.onReset}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageContainer>
    );
  }
}

export default PSetting;
