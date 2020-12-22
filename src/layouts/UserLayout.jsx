import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import React from 'react';
import logo from '../assets/logo-dribble.svg';
import styles from './UserLayout.less';

// login page footer
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

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>SportTMS</span>
              </Link>
            </div>
            <div className={styles.desc}>
              <FormattedMessage
                id="pages.layouts.userLayout.title"
                defaultMessage="欢迎使用 SportTMS 运动队管理系统"
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
