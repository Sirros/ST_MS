import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
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
export default () => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        
      </Card>
    </PageContainer>
  );
};
