import { LockTwoTone, UserOutlined, GithubOutlined } from '@ant-design/icons';
import { Alert, Radio, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { connect, useIntl, FormattedMessage } from 'umi';
// import { getFakeCaptcha } from '@/services/login';
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
  const { status, type: loginType, selectedUser } = userLogin;
  const [type, setType] = useState('account');
  const intl = useIntl();

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
          >
            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
          </a>
        </div>
      </ProForm>
      <div className={styles.footBox}>{defaultFooterDom}</div>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
