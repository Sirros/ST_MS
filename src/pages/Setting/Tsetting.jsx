import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, Upload, message, Select, Tag, Alert } from 'antd';

const { TextArea } = Input;
const color = ['gold', 'lime', 'green', 'cyan', 'sandybrown'];

const TSetting = ({ dispatch, updateStatus }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [init, setInit] = useState({
    team: '',
    belong: '',
    principal: ['王鹏'],
    qq_number: '',
    captain: [],
    vice_captain: [],
    manager: [],
  });
  const [playerOptions, setPlayerOptions] = useState([]);
  const [headofDepOptions, setHeadofDepOptions] = useState([]);

  const formRef = useRef();

  useEffect(() => {
    dispatch({
      type: 'teamSetting/getTeamInfo',
    });
  }, []);

  useEffect(() => {
    const { Info = {} } = updateStatus;
    const {
      departmentInfo = {},
      groupChat,
      teamMembers = [],
      captain = [],
      vice_captain = [],
      manager = [],
    } = Info;
    const { teamAttr, department, HeadofDep } = departmentInfo;

    if (Info.status === 9000) {
      message.success('更新成功！');
    } else if (Info.status === 9001) {
      message.warn('更新失败，请重试...');
    }

    setPlayerOptions(teamMembers);
    setHeadofDepOptions(HeadofDep);
    formRef.current.setFieldsValue({
      ...init,
      team: teamAttr,
      belong: department,
      qq_number: groupChat,
      captain: captain,
      vice_captain: vice_captain,
      manager: manager,
    });
  }, [updateStatus]);

  // 表单布局
  const layout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 10,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 2,
      span: 10,
    },
  };

  // LOGO
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

  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    const randomColor = color[Math.floor(Math.random() * 5)];

    return (
      <Tag color={randomColor} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }

  // logo选择
  const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
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
    v = { ...v, imgB64: imageUrl };
    if (Object.values(v).every((item) => item === '' || item === undefined)) {
      message.info('数据无需更新');
    } else {
      dispatch({
        type: 'teamSetting/updateTeam',
        payload: v,
      });
    }
  };

  const onClose = (e) => {
    console.log(e, 'I was closed.');
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <PageContainer>
      <Card>
        <div>
          <div>
            <Form
              {...layout}
              ref={formRef}
              name="control-ref"
              onFinish={onFinish}
              initialValues={init}
            >
              <Form.Item label="队伍" name="team">
                <Input disabled />
              </Form.Item>
              <Form.Item label="隶属学院" name="belong">
                <Input disabled />
              </Form.Item>
              <Form.Item label="qq群/微信群" name="qq_number" rules={[{ required: false }]}>
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="学院负责人" name="principal" rules={[{ required: false }]}>
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  style={{ width: '100%' }}
                  options={headofDepOptions}
                  allowClear
                />
              </Form.Item>
              <Form.Item label="队长" name="captain" rules={[{ required: false }]}>
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  style={{ width: '100%' }}
                  options={playerOptions}
                  allowClear
                />
              </Form.Item>
              <Form.Item label="副队长" name="vice_captain" rules={[{ required: false }]}>
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  style={{ width: '100%' }}
                  options={playerOptions}
                  allowClear
                />
              </Form.Item>
              <Form.Item label="经理" name="manager" rules={[{ required: false }]}>
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  style={{ width: '100%' }}
                  options={playerOptions}
                  allowClear
                />
              </Form.Item>
              <Form.Item label="队伍行为准则" name="criterion" rules={[{ required: false }]}>
                <TextArea allowClear placeholder="针对队伍的管理，请提出您的宝贵意见！" />
              </Form.Item>
              <Form.Item label="队伍LOGO" rules={[{ required: false }]}>
                <>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="/img/logo" // url
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
                  更新队伍信息
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
                <Alert
                  message="队伍信息更改请慎重!"
                  type="warning"
                  closable
                  style={{ marginTop: 10, width: '35%' }}
                  onClose={onClose}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default connect(({ teamSetting }) => ({
  updateStatus: teamSetting,
}))(TSetting);
