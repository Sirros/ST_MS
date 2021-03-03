import React, { Component } from 'react';
import { Tabs, Table, Row, Col, Statistic } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  Chart,
  Point,
  Tooltip,
  Line,
  Interval,
  Legend,
  View,
  Axis,
  Coordinate,
  Interaction,
  getTheme,
  G2,
} from 'bizcharts';
import styles from './style.less';

const { TabPane } = Tabs;

const dataSource = [
  {
    team: '软件',
    ST: 17,
    ND: 14,
    RD: 10,
    TH: 9,
    key: 1,
  },
  {
    team: '网安',
    ST: 10,
    ND: 4,
    RD: 10,
    TH: 9,
    key: 2,
  },
];

const columns1 = [
  {
    title: '球队',
    dataIndex: 'team',
    key: 'team',
  },
  {
    title: '1ST',
    dataIndex: 'ST',
    key: 'ST',
  },
  {
    title: '2ND',
    dataIndex: 'ND',
    key: 'ND',
  },
  {
    title: '3RD',
    dataIndex: 'RD',
    key: 'RD',
  },
  {
    title: '4TH',
    dataIndex: 'TH',
    key: 'TH',
  },
];

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
    dataIndex: 'rebound',
    sorter: (a, b) => a.rebound - b.rebound,
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
  },
];

const table_data = [];
for (let i = 0; i < 15; i++) {
  table_data.push({
    key: i + 1,
    name: `data111 ${i}`,
    score: Math.floor(Math.random() * 20),
    rebound: Math.floor(Math.random() * 10),
    assist: Math.floor(Math.random() * 10),
    shot: '10/15',
    threepoint: '3/5',
    penalty: '7/8',
    block: Math.floor(Math.random() * 3),
    steal: Math.floor(Math.random() * 3),
    fault: Math.floor(Math.random() * 5),
    foul: Math.floor(Math.random() * 4),
    //[(得分+篮板+助攻+抢断+封盖)-(出手次数-命中次数)-(罚球次数-罚球命中次数)-失误次数]/球员上场比赛的场次
    efficient: `+${Math.floor(20 + 10 + 10 + 2 + 1 - 5 - 1 - 6) / 2}`,
  });
}

const charts_data = [
  {
    section: '1ST',
    team: 'team_1',
    temperature: 17,
  },
  {
    section: '1ST',
    team: 'team_2',
    temperature: 10,
  },
  {
    section: '2ND',
    team: 'team_1',
    temperature: 14,
  },
  {
    section: '2ND',
    team: 'team_2',
    temperature: 4,
  },
  {
    section: '3RD',
    team: 'team_1',
    temperature: 10,
  },
  {
    section: '3RD',
    team: 'team_2',
    temperature: 10,
  },
  {
    section: '4TH',
    team: 'team_1',
    temperature: 9,
  },
  {
    section: '4TH',
    team: 'team_2',
    temperature: 9,
  },
  {
    section: 'Total',
    team: 'team_1',
    temperature: 50,
  },
  {
    section: 'Total',
    team: 'team_2',
    temperature: 33,
  },
];

const bin_data = [
  { item: '两分球', count: 40, percent: 0.4 },
  { item: '三分球', count: 21, percent: 0.21 },
  { item: '罚球', count: 9, percent: 0.09 },
];

const bin_cols = {
  percent: {
    formatter: (val) => {
      val = val * 100 + '%';
      return val;
    },
  },
};

const zhu_data = [
  { name: '命中', type: '运动战', num: 12 },
  { name: '命中', type: '两分球', num: 10 },
  { name: '命中', type: '三分球', num: 4 },
  { name: '命中', type: '罚球', num: 11 },
  { name: '未命中', type: '运动战', num: 10 },
  { name: '未命中', type: '两分球', num: 13 },
  { name: '未命中', type: '三分球', num: 8 },
  { name: '未命中', type: '罚球', num: 3 },
];

class DataResult extends Component {
  state = {
    scale: {
      temperature: { min: 0 },
      team: {
        formatter: (v) => {
          return {
            team_1: '软件',
            team_2: '网安',
          }[v];
        },
      },
    },
  };

  handleTabChange = (key) => {
    console.log(key);
  };

  // 概览渲染
  renderFirstTab = () => {
    return (
      <Row gutter={10}>
        <Col span={5}>
          <Statistic className={styles.stat} title="软件" value={50} />
        </Col>
        <Col span={14}>
          <Table
            style={{ marginBottom: 5 }}
            columns={columns1}
            dataSource={dataSource}
            pagination={false}
          />
        </Col>
        <Col span={5}>
          <Statistic className={styles.stat} title="网安" value={33} />
        </Col>
      </Row>
    );
  };
  // 数据表格渲染
  renderTableTab = () => {
    return (
      <ProTable
        columns={columns}
        request={async () => {
          return {
            data: table_data || [],
            success: true,
          };
        }}
        rowKey="key"
        dateFormatter="string"
        search={false}
        pagination={false}
        options={{
          search: false,
          reload: false,
          density: false,
        }}
        scroll={{ x: 1300 }}
        className={styles.pt}
      />
    );
  };
  // 数据图表渲染
  renderChartsTab = () => {
    return (
      <>
        <Row>
          <Col span={24} className={styles.compare_charts}>
            <p className={styles.charts_title}>节次得分对照表</p>
            <Chart
              scale={this.state.scale}
              padding={[30, 20, 50, 40]}
              autoFit
              height={320}
              data={charts_data}
              interactions={['element-active']}
            >
              <Point position="section*temperature" color="team" shape="circle" />
              <Line
                shape="smooth"
                position="section*temperature"
                color="team"
                label="temperature"
              />
              <Tooltip shared showCrosshairs />
            </Chart>
          </Col>
          <Col span={12} className={styles.bin_charts}>
            <p className={styles.charts_title}>得分类型对照表</p>
            <Chart height={400} data={bin_data} scale={bin_cols} autoFit>
              <Coordinate type="theta" radius={0.75} />
              <Tooltip showTitle={false} />
              <Axis visible={false} />
              <Interval
                position="percent"
                adjust="stack"
                color="item"
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
                label={[
                  'count',
                  {
                    content: (data) => {
                      return `${data.item}: ${data.percent * 100}%`;
                    },
                  },
                ]}
                state={{
                  selected: {
                    style: (t) => {
                      const res = getTheme().geometries.interval.rect.selected.style(t);
                      return { ...res, fill: 'red' };
                    },
                  },
                }}
              />
              <Interaction type="element-single-selected" />
            </Chart>
          </Col>
          <Col span={12} className={styles.zhu_charts}>
            <p className={styles.charts_title}>得分方式对照表</p>
            <Chart height={400} padding="auto" data={zhu_data} autoFit errorContent="图表发生错误">
              <Interval
                adjust={[
                  {
                    type: 'dodge',
                    marginRatio: 0,
                  },
                ]}
                color="name"
                position="type*num"
              />
              <Tooltip shared />
            </Chart>
          </Col>
        </Row>
      </>
    );
  };

  render() {
    const { handleTabChange, renderFirstTab, renderTableTab, renderChartsTab } = this;
    return (
      <PageContainer title="数据">
        <Tabs className={styles.myTabs} defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab="概况" key="1">
            {renderFirstTab()}
          </TabPane>
          <TabPane tab="数据统计" key="2">
            {renderTableTab()}
          </TabPane>
          <TabPane tab="图表" key="3">
            {renderChartsTab()}
          </TabPane>
        </Tabs>
      </PageContainer>
    );
  }
}

export default DataResult;
