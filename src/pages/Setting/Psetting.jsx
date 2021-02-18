import React, { Component, useState, useRef, useEffect } from 'react';
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
    message.error('你只能上传JPG/JEPG/PNG格式的图片文件');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小必须小于2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const PSetting = () => {
  const [tag, setTag] = useState(true);
  const [loading, setLoading] = useState(false);
  const [province, setProvince] = useState(provinceData[0]);
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [city, setCity] = useState(cityData[provinceData[0]][0]);
  const [tags, setTags] = useState(['默认标签']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const formRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if(inputRef.current && typeof inputRef.current.focus === 'function') {
      inputRef.current.focus()
    }
  }, [inputVisible])

  const handleClose = (removedTag) => {
    const _tags = tags.filter((tag) => tag !== removedTag);
    setTags(_tags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let _temp = [];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      _temp = [...tags, inputValue]
    }
    setTags(_temp);
    setInputValue('');
    setInputVisible(false);
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
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
  const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (imageUrl) => {
          setImageUrl(imageUrl);
          setLoading(false);
        },
      );
    }
  };
  // 省份修改
  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setProvince(value);
    setCity(cityData[value][0]);
  };
  // 城市修改
  const onCityChange = (value) => {
    setCity(value);
  };
  // 重置
  const onReset = () => {
    formRef.current.resetFields();
    setImageUrl('');
  };
  // 提交
  const onFinish = (v) => {
    v = { ...v, imageUrl, area: { province, city } };
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
    console.log(v);
  };

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
                    <span className={styles.title}>年级:</span>
                  </Col>
                  <Col span={16}>
                    <span>2017</span>
                  </Col>
                  <Col span={8}>
                    <span className={styles.title}>身高:</span>
                  </Col>
                  <Col span={16}>
                    <span>182cm</span>
                  </Col>
                  <Col span={8}>
                    <span className={styles.title}>体重:</span>
                  </Col>
                  <Col span={16}>
                    <span>100kg</span>
                  </Col>
                  <Col span={8}>
                    <span className={styles.title}>联系电话:</span>
                  </Col>
                  <Col span={16}>
                    <span>13032867907</span>
                  </Col>
                  <Col span={8}>
                    <span className={styles.title}>邮箱:</span>
                  </Col>
                  <Col span={16}>
                    <span>13032867907@163.com</span>
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
                </Row>
              </div>
              <Row>
                <Col span={8}>
                  <span style={{ display: 'block', textAlign: 'right', padding: '0 12px' }}>
                    标签:
                  </span>
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
                        ref={inputRef}
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
                      <Tag
                        onClick={showInput}
                        style={tags.length ? { marginTop: '16px' } : {}}
                        className="site-tag-plus"
                      >
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
                body_info: ''
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
              <Form.Item label="球衣号码" name="number" rules={[{ required: false }]}>
                <Input min={0} max={99} placeholder="请输入球衣号码，如果有多个请用'/'分隔：新生杯/三十二院" />
              </Form.Item>
              <Form.Item label="球衣码数" name="size" rules={[{ required: false }]}>
                <Input min={0} max={6} placeholder="请输入球衣码数" />
              </Form.Item>
              <Form.Item label="身高体重" name="body_info" rules={[{ required: false }]}>
                <Input min={0} max={6} placeholder="请输入身高体重，请用'/'分隔：身高cm/体重kg" />
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
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default PSetting;
