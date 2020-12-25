import React from 'react';
import { Card } from 'antd';
import { FormattedMessage } from 'umi';
import { Row, Col } from 'antd';
import TeamLogo from '../assets/default_logo.jpg';
import styles from './Welcome.less';

const { Meta } = Card;

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
  return (
      <Row>
        <Col span={7}>
          <Card
            style={{textAlign: 'center'}}
            bordered={false}
            hoverable={true}
            // loading={true}
          >
            <Card style={{overflow: 'hidden', border: 'none'}}>
              <img className={styles.cardImg} src={TeamLogo} alt="logo" />
            </Card>
            <Meta 
              title='card title'
              description="this is a description"
            />
          </Card>
        </Col>
      </Row>
  );
};
