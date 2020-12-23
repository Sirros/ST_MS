import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { FormattedMessage } from 'umi';
import { Row, Col } from 'antd';
import styles from './Welcome.less';

// 复制
// const CodePreview = ({ children }) => (
//   <pre className={styles.pre}>
//     <code>
//       <Typography.Text copyable>{children}</Typography.Text>
//     </code>
//   </pre>
// );
// <CodePreview>yarn add @ant-design/pro-table</CodePreview> 
const bigBox = () => (
  <div></div>
);

export default () => {
  return (
    <PageContainer
      title="软件学院篮球队"
    >
      <Row>
        <Col span={8}>
          <Card>123</Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
