import React from 'react';
import { List, Typography, Divider, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';

export default () => {
  const antaData = [
    '2020 xxxxxx',
    '2019 xxxxxx',
    '2018 xxxxxx',
    '2017 xxxxxx',
    '2016 xxxxxx',
    '2015 xxxxxx',
  ];

  const freshmanData = [
    '2020 xxxxxx',
    '2019 xxxxxx',
    '2018 xxxxxx',
    '2017 xxxxxx',
    '2016 xxxxxx',
    '2015 xxxxxx',
  ];

  return (
    <PageContainer>
      <Card>
        <div className={styles.anta}>
          <Divider dashed orientation="center">
            江安杯/32院
          </Divider>
          <List dataSource={antaData} renderItem={(item) => <List.Item>{item}</List.Item>} />
        </div>
        <div className={styles.freshman}>
          <Divider dashed orientation="center">
            新生杯
          </Divider>
          <List dataSource={freshmanData} renderItem={(item) => <List.Item>{item}</List.Item>} />
        </div>
      </Card>
    </PageContainer>
  );
};
