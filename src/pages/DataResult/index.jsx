import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import styles from './style.less';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '名字',
    dataIndex: 'name',
  },
  {
    title: '得分',
    dataIndex: 'score',
    sorter: (a, b) => a.score - b.score,
  },
  {
    title: '篮板',
    dataIndex: 'rebouncd',
    sorter: (a, b) => a.rebouncd - b.rebouncd,
  },
  {
    title: '助攻',
    dataIndex: 'assist',
    sorter: (a, b) => a.assist - b.assist,
  },
  {
    title: '投篮',
    dataIndex: 'shot',
    sorter: (a, b) => a.shot - b.shot,
  },
  {
    title: '三分',
    dataIndex: 'threepoint',
    sorter: (a, b) => a.threepoint - b.threepoint,
  },
  {
    title: '罚球',
    dataIndex: 'penalty',
    sorter: (a, b) => a.penalty - b.penalty,
  },
  {
    title: '抢断',
    dataIndex: 'steal',
    sorter: (a, b) => a.steal - b.steal,
  },
  {
    title: '盖帽',
    dataIndex: 'block',
    sorter: (a, b) => a.block - b.block,
  },
  {
    title: '失误',
    dataIndex: 'fault',
    sorter: (a, b) => a.fault - b.fault,
  },
  {
    title: '犯规',
    dataIndex: 'foul',
    sorter: (a, b) => a.foul - b.foul,
  },
  {
    title: '效率值',
    dataIndex: 'efficient',
    sorter: (a, b) => a.efficient - b.efficient,
  }
];

const data = [];

for(let i=0; i<15; i++) {
  data.push(
    {
      key: i+1,
      name: `马克 ${i}`,
      score: Math.floor(Math.random() * 20),
      rebouncd: Math.floor(Math.random() * 10),
      assist: Math.floor(Math.random() * 10),
      shot: '10/15',
      threepoint: '3/5',
      penalty: '7/8',
      block: Math.floor(Math.random() * 3),
      steal: Math.floor(Math.random() * 3),
      fault: Math.floor(Math.random() * 5),
      foul: Math.floor(Math.random() * 4),
      //[(得分+篮板+助攻+抢断+封盖)-(出手次数-命中次数)-(罚球次数-罚球命中次数)-失误次数]/球员上场比赛的场次
      efficient: `+${Math.floor(((20 + 10 + 10 + 2 + 1) - (5) - 1) - 6) / 2}`,
    }
  )
}

class DataResult extends Component {
  render() {
    return (
      <PageContainer title='数据'>
        <ProTable
          columns={columns}
          request={async () => {
            return {
              data,
              success: true,
            };
          }}
          rowKey="key"
          dateFormatter="string"
          headerTitle="2020-12-12 对阵 网安 54-64"
          search={false}
          pagination={false}
          options={{
            search: false,
            reload: false
          }}
          className={styles.pt}
        />
      </PageContainer>
    );
  }
}

export default DataResult;