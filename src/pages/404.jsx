import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，您当前访问的页面不存在。"
    extra={
      <Button type="primary" onClick={() => history.goBack()}>
        返回
      </Button>
    }
  />
);

export default NoFoundPage;
