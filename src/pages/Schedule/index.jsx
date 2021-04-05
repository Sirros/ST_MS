import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Row, Col, List, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './index.less';
import moment from 'moment';

const Sechedule = ({ dispatch, events }) => {
  const [defaultDate, setDefaultDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedList, setSelectedList] = useState([]);
  const [panelMode, setPanelMode] = useState('month');
  const [dateEvents, setDateEvents] = useState({});

  useEffect(() => {
    dispatch({
      type: 'sechdule/getDataEvents',
    });
  }, []);

  useEffect(() => {
    setDateEvents(events.events);
  }, [events]);

  // 日期选择回调
  const handleSelect = (value) => {
    let data = getListData(value);
    if (data[0] && data[0].content.indexOf('；') > -1) {
      data = data[0].content.split('；');
      for (let i = 0; i < data.length; i++) {
        data[i] = {
          type: 'warning',
          content: data[i],
        };
      }
    }
    setDefaultDate(value);
    setSelectedDate(value);
    setSelectedList(data);
  };

  const handlePanelChange = (moment, mode) => {
    setPanelMode(mode);
  };

  // 获取数据
  const getListData = (value) => {
    let listData;
    const { mon = [], details = {} } = dateEvents;

    mon.forEach((m) => {
      if (value.month() + 1 === m) {
        details[m].eventsDay.forEach((d) => {
          if (value.date() === d) {
            listData = details[m].dayDetail[d];
          }
        });
      }
    });

    return listData || [];
  };

  // 自定义日期渲染
  const dateCellRender = (value) => {
    let data = getListData(value);
    if (data[0] && data[0].content.indexOf('；') > -1) {
      data = data[0].content.split('；');
      for (let i = 0; i < data.length; i++) {
        data[i] = {
          type: 'warning',
          content: data[i],
        };
      }
    }
    return (
      <ul className={styles.Events}>
        {data.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  // day change func
  const changeDay = (day) => {
    switch (day.day()) {
      case 1:
        return '一';
        break;
      case 2:
        return '二';
        break;
      case 3:
        return '三';
        break;
      case 4:
        return '四';
        break;
      case 5:
        return '五';
        break;
      case 6:
        return '六';
        break;
      default:
        return '日';
    }
  };

  return (
    <PageContainer>
      <Row gutter={5} className={styles.Wrapper}>
        <Col span={11} className={styles.leftPart} style={{ padding: 15 }}>
          <p>
            <span style={{ marginRight: 10 }}>{selectedDate.format('YYYY-MM-DD')}</span>
            {panelMode === 'month' && (
              <span style={{ marginLeft: 10 }}>星期：{changeDay(selectedDate)}</span>
            )}
          </p>
          <Divider dashed />
          <List>
            {selectedList && selectedList.length > 0 ? (
              selectedList.map((item) => (
                <List.Item key={item.content} style={{ fontSize: 16 }}>
                  <Badge status={item.type} /> {item.content}
                </List.Item>
              ))
            ) : (
              <p>暂无安排</p>
            )}
          </List>
        </Col>
        <Col span={13} style={{ borderLeft: '1px solid #e4e4e4' }}>
          <Calendar
            value={defaultDate}
            onSelect={handleSelect}
            dateCellRender={dateCellRender}
            onPanelChange={handlePanelChange}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default connect(({ sechdule, loading }) => ({
  events: sechdule,
  submitting: loading.effects['sechdule/getDateEvents'],
}))(Sechedule);
