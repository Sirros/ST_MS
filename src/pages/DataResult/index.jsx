import React, { useState, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Table, Row, Col, Statistic } from 'antd';
import {
  Chart,
  Point,
  Tooltip,
  Line,
  Interval,
  Axis,
  Coordinate,
  Interaction,
  getTheme,
} from 'bizcharts';
import { connect } from 'umi';
import { scoreColumns, personalColumns } from '@/utils/columns';
import styles from './style.less';

const { TabPane } = Tabs;

const DataResult = ({ total, dispatch }) => {
  const [totalDetails, setTotalDetails] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'dataResult/getData',
    });
  }, []);

  useEffect(() => {
    const { totalData } = total;
    setTotalDetails(totalData);
  }, [total]);

  const handleTabChange = (key) => {
    console.log('tab change', key);
  };

  // 概览渲染
  const renderFirstTab = (item) => {
    const { our_team, opponent_team } = item;
    const twoTeamInfo = [our_team, opponent_team];
    const our_team_total_score = our_team.ST + our_team.ND + our_team.RD + our_team.TH;
    const opponent_team_total_score =
      opponent_team.ST + opponent_team.ND + opponent_team.RD + opponent_team.TH;
    const our_team_name = our_team.team;
    const opponent_team_name = opponent_team.team;

    return (
      <Row gutter={10}>
        <Col span={5}>
          <Statistic className={styles.stat} title={our_team_name} value={our_team_total_score} />
        </Col>
        <Col span={14}>
          <Table
            style={{ marginBottom: 5 }}
            columns={scoreColumns}
            dataSource={twoTeamInfo}
            pagination={false}
          />
        </Col>
        <Col span={5}>
          <Statistic
            className={styles.stat}
            title={opponent_team_name}
            value={opponent_team_total_score}
          />
        </Col>
      </Row>
    );
  };

  // 数据表格渲染
  const renderTableTab = (item) => {
    const { our_players_detail } = item;

    return (
      <ProTable
        columns={personalColumns}
        request={async () => {
          return {
            data: our_players_detail || [],
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
  const renderChartsTab = (item) => {
    const { our_binData, our_zhuData, zhexian_Data } = item;
    const scale = {
      temperature: { min: 0 },
      team: {
        formatter: (v) => {
          return {
            team_1: '软件',
            team_2: '网安',
          }[v];
        },
      },
    };
    const bin_cols = {
      percent: {
        formatter: (val) => {
          val = val * 100 + '%';
          return val;
        },
      },
    };

    return (
      <>
        <Row>
          <Col span={24} className={styles.compare_charts}>
            <p className={styles.charts_title}>节次得分对照表</p>
            <Chart
              scale={scale}
              padding={[30, 20, 50, 40]}
              autoFit
              height={320}
              data={zhexian_Data}
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
            <Chart height={400} data={our_binData} scale={bin_cols} autoFit>
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
            <Chart
              height={400}
              padding="auto"
              data={our_zhuData}
              autoFit
              errorContent="图表发生错误"
            >
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

  return (
    <PageContainer title="数据">
      {totalDetails &&
        totalDetails.map((item, i) => {
          return (
            <Tabs key={i} className={styles.myTabs} defaultActiveKey="1" onChange={handleTabChange}>
              <TabPane tab="概况" key="1">
                {renderFirstTab(item)}
              </TabPane>
              <TabPane tab="数据统计" key="2">
                {renderTableTab(item)}
              </TabPane>
              <TabPane tab="图表" key="3">
                {renderChartsTab(item)}
              </TabPane>
            </Tabs>
          );
        })}
    </PageContainer>
  );
};

export default connect(({ dataResult }) => ({
  total: dataResult,
}))(DataResult);
