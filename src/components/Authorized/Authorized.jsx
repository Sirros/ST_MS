import React from 'react';
import { Result } from 'antd';
import check from './CheckPermissions';

const Authorized = ({
  children, // 希望渲染的子组件
  authority, // 当前路由的权限
  noMatch = ( // 权限不满足时，显示的页面组件
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有权限访问当前页面。"
    />
  ),
}) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = check(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized;
