import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { TweenOneGroup } from 'rc-tween-one';
import { LoadingOutlined, PlusOutlined, AntDesignOutlined } from '@ant-design/icons';
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  message,
  Avatar,
  Row,
  Col,
  Divider,
  Tag,
  Modal,
} from 'antd';
import { connect } from 'umi';
import styles from './psettingStyle.less';
import { getDifference } from '@/utils/utils.js';

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

const PSetting = ({ dispatch, userInfo, currentUser }) => {
  const [basicInfo, setBasicInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(['默认标签']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const formRef = useRef();
  const inputRef = useRef();
  const modalFormRef = useRef();

  useEffect(() => {
    dispatch({
      type: 'personalSetting/getUserInfo',
    });
  }, []);

  useEffect(() => {
    const {
      studentId,
      name,
      avatar,
      phone,
      area,
      signature,
      grade,
      em,
      height,
      weight,
      jersey_number,
    } = userInfo.user;
    setBasicInfo({
      studentId,
      name,
      avatar,
      phone,
      area,
      signature,
      grade,
      em,
      height,
      weight,
      jersey_number,
    });
    formRef.current.setFieldsValue({
      name,
      studentId,
      area,
      signature,
      phone,
      height,
      weight,
      jersey_number,
      em,
    });
  }, [userInfo.user]);

  useEffect(() => {
    if (userInfo.result && userInfo.result === 9000) {
      message.success('数据更新提交');
    }
  }, [userInfo.result]);

  useEffect(() => {
    if (userInfo.changeState && userInfo.changeState === 10000) {
      setTimeout(() => {
        message.success('修改密码成功😊');
        setModalVisible(false);
        setConfirmLoading(false);
      }, 2000);
    }
  }, [userInfo.changeState]);

  useEffect(() => {
    if (inputRef.current && typeof inputRef.current.focus === 'function') {
      inputRef.current.focus();
    }
  }, [inputVisible]);

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
      _temp = [...tags, inputValue];
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
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setFileName(info.file.name);
        setLoading(false);
      });
    }
  };

  // 重置
  const onReset = () => {
    formRef.current.resetFields();
    setImageUrl('');
  };

  // 提交
  const onFinish = (v) => {
    if (imageUrl) {
      v.imageUrl = imageUrl;
      v.fileName = fileName;
    }
    if (Object.keys(getDifference(v, basicInfo)).length === 0) {
      message.info('数据无需更新');
    } else {
      dispatch({
        type: 'personalSetting/updateUser',
        payload: v,
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const changePsw = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    const formData = modalFormRef.current.getFieldsValue();
    const { oldPsw, newPsw, repeatPsw } = formData;
    if (oldPsw && newPsw && repeatPsw && newPsw === repeatPsw) {
      setConfirmLoading(true);
      dispatch({
        type: 'personalSetting/changePassword',
        payload: { ...formData, uid: basicInfo.studentId },
      });
    } else {
      message.warning('两次密码输入不一致，请重试...');
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  function renderModal() {
    return (
      <Modal
        title="修改密码"
        visible={modalVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form {...layout} ref={modalFormRef} name="resetPsw-form">
          <Form.Item label="旧的密码" name="oldPsw">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="新的密码" name="newPsw">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="重复" name="repeatPsw">
            <Input type="password" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

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
                    src={basicInfo.avatar}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<AntDesignOutlined />}
                  />
                </div>
                <div className={styles.infoTitle}>
                  <div>
                    <h2>{basicInfo.name}</h2>
                  </div>
                  <div>
                    <span>{basicInfo.studentId}</span>
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
                    <span>{basicInfo.grade}</span>
                  </Col>
                  <Col span={8}>
                    <span className={styles.title}>身高:</span>
                  </Col>
                  <Col span={16}>
                    <span>{`${basicInfo.height}cm`}</span>
                  </Col>
                  <Col span={8}>
                    <span className={styles.title}>体重:</span>
                  </Col>
                  <Col span={16}>
                    <span>{`${basicInfo.weight}kg`}</span>
                  </Col>
                  <Col span={8}>
                    <span className={styles.title}>联系电话:</span>
                  </Col>
                  <Col span={16}>
                    <span>{basicInfo.phone}</span>
                  </Col>
                  <Col span={8}>
                    <span className={styles.title}>邮箱:</span>
                  </Col>
                  <Col span={16}>
                    <span>{basicInfo.em}</span>
                  </Col>
                  <Col span={8}>
                    <span className={styles.title}>地区:</span>
                  </Col>
                  <Col span={16}>
                    <span>{basicInfo.area}</span>
                  </Col>
                  <Col span={8}>
                    <span className={styles.title}>个性签名:</span>
                  </Col>
                  <Col span={16}>
                    <span>{basicInfo.signature}</span>
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
            <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
              <Form.Item label="姓名" name="name">
                <Input disabled />
              </Form.Item>
              <Form.Item label="学号" name="studentId">
                <Input disabled />
              </Form.Item>
              <Form.Item label="邮箱" name="em" rules={[{ required: false, type: 'email' }]}>
                <Input min={0} max={6} placeholder="请输入有效的邮箱地址" />
              </Form.Item>
              <Form.Item label="联系电话" name="phone" rules={[{ required: false }]}>
                <Input min={0} max={6} placeholder="请输入有效的电话号码" />
              </Form.Item>
              <Form.Item label="球衣号码" name="jersey_number" rules={[{ required: false }]}>
                <Input min={0} max={99} placeholder="优先使用32院球衣号码" />
              </Form.Item>
              <Form.Item label="身高" name="height" rules={[{ required: false }]}>
                <Input min={0} max={6} placeholder="请输入身高cm" />
              </Form.Item>
              <Form.Item label="体重" name="weight" rules={[{ required: false }]}>
                <Input min={0} max={6} placeholder="请输入体重kg" />
              </Form.Item>

              <Form.Item label="地区" name="area" rules={[{ required: false }]}>
                <Input placeholder="省 - 市" allowClear />
              </Form.Item>
              <Form.Item label="个性签名" name="signature" rules={[{ required: false }]}>
                <Input placeholder="将会展示于个人信息与首页" allowClear />
              </Form.Item>
              {/* <Form.Item label="意见" name="opinion" rules={[{ required: false }]}>
                <TextArea allowClear placeholder="针对队伍的管理，请提出您的宝贵意见！" />
              </Form.Item> */}
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
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                  更新基本信息
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
                <Button type="dashed" onClick={changePsw} style={{ marginLeft: 10 }}>
                  修改登陆密码
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        {renderModal()}
      </Card>
    </PageContainer>
  );
};

export default connect(({ personalSetting }) => ({
  userInfo: personalSetting,
}))(PSetting);
