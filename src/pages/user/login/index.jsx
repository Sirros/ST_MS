import { LockTwoTone, UserOutlined, GithubOutlined } from '@ant-design/icons';
import { Alert, Radio, Tabs, Drawer, Form, Button, Col, Row, Input, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { connect, useIntl, FormattedMessage } from 'umi';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

// footer 信息
const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 四川大学软件学院林子博`}
    links={[
      {
        key: 'SportT MS',
        title: 'SportT MS',
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/Sirros',
        blankTarget: true,
      },
      {
        key: 'Sirros',
        title: 'Sirros',
      },
    ]}
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType, selectedUser, resetStatus } = userLogin;
  const [type, setType] = useState('account');
  const intl = useIntl();
  const formRef = useRef();

  const [visible, setVisible] = useState(false);
  const [targetEM, setTargetEM] = useState('');
  const [targetID, setTargetID] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    console.log(resetStatus);
    if (resetStatus === 10000) {
      setVisible(false);
      message.success('重置密码成功😊');
    }
  }, [resetStatus]);

  // 提交登陆
  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type, selectedUser },
    });
  };

  // 选择角色
  const handleSelectUser = (e) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/selectedUser',
      payload: e.target.value,
    });
  };

  const resetPsw = (e) => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const sendCode = () => {
    const { dispatch } = props;
    setBtnDisabled(false);
    message.success('验证码已发送至邮箱');
    dispatch({
      type: 'login/sendCode',
      payload: { targetEM, targetID },
    });
    setTimeout(() => {
      setBtnDisabled(true);
    }, 60000);
  };

  const uidChange = (e) => {
    setTargetID(e.target.value);
  };

  const emailChange = (e) => {
    if (e.target.value.length !== 0) {
      setTargetEM(e.target.value);
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  };

  const submit = () => {
    const formData = formRef.current.getFieldsValue();
    delete formData.btn;
    const { newPSW, check_newPSW } = formData;

    const { dispatch } = props;
    if (newPSW === check_newPSW) {
      dispatch({
        type: 'login/resetPsw',
        payload: formData,
      });
    } else {
      message.warning('两次密码不一致，请重试');
    }
  };

  // 表单
  function renderDW() {
    return (
      <Drawer
        title="重置密码"
        width={560}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={submit} type="primary">
              提交
            </Button>
          </div>
        }
      >
        <Form layout="vertical" ref={formRef} hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="studentId"
                label="学号"
                rules={[{ required: true, message: '请输入学号' }]}
              >
                <Input onChange={uidChange} placeholder="请输入学号" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="newPSW"
                label="新密码"
                rules={[{ required: true, message: '请输入新密码' }]}
              >
                <Input placeholder="请输入新密码" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="check_newPSW"
                label="确认新密码"
                rules={[{ required: true, message: '请再次输入新密码' }]}
              >
                <Input placeholder="请再次输入新密码" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[{ required: true, type: 'email', message: '请输入邮箱' }]}
              >
                <Input onChange={emailChange} placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="btn" label="*" rules={[{ required: true, message: '' }]}>
                <Button disabled={!btnDisabled} onClick={sendCode} type="dashed">
                  发送验证码
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item name="code1" rules={[{ required: true, message: '请输入验证码' }]}>
                <Input style={{ textAlign: 'center' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="code2" rules={[{ required: true, message: '请输入验证码' }]}>
                <Input style={{ textAlign: 'center' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="code3" rules={[{ required: true, message: '请输入验证码' }]}>
                <Input style={{ textAlign: 'center' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="code4" rules={[{ required: true, message: '请输入验证码' }]}>
                <Input style={{ textAlign: 'center' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="code5" rules={[{ required: true, message: '请输入验证码' }]}>
                <Input style={{ textAlign: 'center' }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="code6" rules={[{ required: true, message: '请输入验证码' }]}>
                <Input style={{ textAlign: 'center' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  }

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async (values) => {
          handleSubmit(values);
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="account"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
              defaultMessage: '账户密码登录',
            })}
          />
        </Tabs>

        {status === 'error' && type === 'account' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: '账户或密码错误（root/123456)',
            })}
          />
        )}
        {type === 'account' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '用户名: root',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockTwoTone className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码: 123456',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <Radio.Group onChange={handleSelectUser} value={selectedUser}>
            <Radio value="baller">球员</Radio>
            <Radio value="captain">队长/经理</Radio>
            <Radio value="admin">管理员</Radio>
          </Radio.Group>
          <a
            style={{
              float: 'right',
              marginBottom: 10,
            }}
            onClick={resetPsw}
          >
            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
          </a>
        </div>
      </ProForm>
      <div className={styles.footBox}>{defaultFooterDom}</div>
      {renderDW()}
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
