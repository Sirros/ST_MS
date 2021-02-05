import React, { Component } from 'react';
import ImgCrop from 'antd-img-crop';
import { PageContainer } from '@ant-design/pro-layout';
import { TweenOneGroup } from 'rc-tween-one';
import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
  AntDesignOutlined,
} from '@ant-design/icons';
import {
  Card, Form, Input, InputNumber, Button, Upload,
  Image, message, Select, Avatar, List, Row,
  Col, Divider, Tag,
} from 'antd';
import styles from './psettingStyle.less';
import ava from '@/assets/01.jpg';

const { TextArea } = Input;
const { Option } = Select;

// 表单布局
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
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
  const isJpgOrPng =
    file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
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
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      inputVisible: false,
      inputValue: '',
    };
  }
  formRef = React.createRef();

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

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
    delete v.name;
    delete v.id;
    if (v.area && v.area.province === '四川' && v.area.city === '成都') {
      delete v.area;
    }
    if (Object.values(v).every((item) => item === '' || item === undefined)) {
      message.info('数据无需更新');
    } else {
      /**
       * 做数据请求
       */
      message.success('数据更新提交');
    }
  };

  render() {
    const {
      loading,
      imageUrl,
      cities,
      city,
      fileList,
      tags,
      inputVisible,
      inputValue,
    } = this.state;
    const {
      formRef,
      onFinish,
      handleProvinceChange,
      onCityChange,
      handleUploadChange,
      handleClose,
      showInput,
      handleInputChange,
      handleInputConfirm,
      saveInputRef,
      forMap,
    } = this;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const tagChild = tags.map(forMap);
    return (
      <PageContainer>
        <Card>
          <div className={styles.contentBox}>
            <div className={styles.contentBoxLeft}>
              <Card>
                <div className={styles.info}>
                  <div className={styles.ava}>
                    <Avatar
                      src={ava}
                      size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                      icon={<AntDesignOutlined />}
                    />
                  </div>
                  <div className={styles.infoTitle}>
                    <div>
                      <h2>raj</h2>
                    </div>
                    <div>
                      <span>2017141463192</span>
                    </div>
                  </div>
                </div>
                <Divider dashed />
                <div className={styles.detail}>
                  <Row gutter={24}>
                    <Col span={8}>
                      <span className={styles.title}>邮箱:</span>
                    </Col>
                    <Col span={16}>
                      <span>13032867907@163.com</span>
                    </Col>
                    <Col span={8}>
                      <span className={styles.title}>年级:</span>
                    </Col>
                    <Col span={16}>
                      <span>2017</span>
                    </Col>
                    <Col span={8}>
                      <span className={styles.title}>联系电话:</span>
                    </Col>
                    <Col span={16}>
                      <span>13032867907</span>
                    </Col>
                    <Col span={8}>
                      <span className={styles.title}>地区:</span>
                    </Col>
                    <Col span={16}>
                      <span>四川成都</span>
                    </Col>
                    <Col span={8}>
                      <span className={styles.title}>个性签名:</span>
                    </Col>
                    <Col span={16}>
                      <span>
                        小星星小星星小星星小星星小星星小星星小星星小星星小星星小星星小星星小星星
                      </span>
                    </Col>
                    <Divider dashed />
                  </Row>
                </div>
                <Row>
                  <Col span={8}>
                    <span style={{display: 'block', textAlign: 'right', padding: '0 12px'}}>标签:</span>
                  </Col>
                  <Col span={16}>
                    <>
                    {/* 标签 */}
                      <div>
                        <TweenOneGroup
                          enter={{
                            scale: 0.8,
                            opacity: 0,
                            type: 'from',
                            duration: 100,
                            onComplete: (e) => {
                              e.target.style = '';
                            },
                          }}
                          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                          appear={false}
                        >
                          {tagChild}
                        </TweenOneGroup>
                      </div>
                      {inputVisible && (
                        <Input
                          ref={saveInputRef}
                          type="text"
                          size="small"
                          style={tags.length ? { width: 78, marginTop: '16px' } : { width: 78 }}
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={handleInputConfirm}
                          onPressEnter={handleInputConfirm}
                        />
                      )}
                      {!inputVisible && (
                        <Tag onClick={showInput} style={tags.length ? {marginTop: '16px'} : {}} className="site-tag-plus">
                          <PlusOutlined /> 添加标签
                        </Tag>
                      )}
                    </>
                  </Col>
                </Row>
              </Card>
            </div>
            <div className={styles.contentBoxRight}>
              <Form
                {...layout}
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}
                initialValues={{
                  name: 'raj',
                  id: '2017141463192',
                  area: '',
                  message: '',
                  opinion: '',
                  size: '',
                  email: '',
                }}
              >
                <Form.Item label="姓名" name="name">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="学号" name="id">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="邮箱" name="email" rules={[{ required: false, type: 'email' }]}>
                  <Input min={0} max={6} placeholder="请输入有效的邮箱地址" />
                </Form.Item>
                <Form.Item label="联系电话" name="phoneNumber" rules={[{ required: false }]}>
                  <Input min={0} max={6} placeholder="请输入有效的电话号码" />
                </Form.Item>
                <Form.Item
                  label="球衣号码"
                  name="number"
                  rules={[{ type: 'number', required: false }]}
                >
                  <Input min={0} max={99} placeholder="请输入球衣号码" />
                </Form.Item>
                <Form.Item label="球衣码数" name="size" rules={[{ required: false }]}>
                  <Input min={0} max={6} placeholder="请输入球衣码数" />
                </Form.Item>
                <Form.Item label="头像" rules={[{ required: false }]}>
                  <>
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
                  </>
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
                <Form.Item label="个性签名" name="message" rules={[{ required: false }]}>
                  <Input placeholder="将会展示于个人信息与首页" allowClear />
                </Form.Item>
                <Form.Item label="意见" name="opinion" rules={[{ required: false }]}>
                  <TextArea allowClear placeholder="针对队伍的管理，请提出您的宝贵意见！" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                    更新基本信息
                  </Button>
                  <Button htmlType="button" onClick={this.onReset}>
                    重置
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Card>
      </PageContainer>
    );
  }
}

export default PSetting;
