import React, { useState } from 'react';
import { Calendar, Badge, Row, Col, List, Divider } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import moment from 'moment';

export default () => {
  const [defaultDate, setDefaultDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedList, setSelectedList] = useState([]);
  const [panelMode, setPanelMode] = useState('month');

  // 日期选择回调
  const handleSelect = (value) => {
    const data = getListData(value);
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
    switch (value.date()) {
      case 8:
        if (value.month() === 9) {
          listData = [
            { type: 'warning', content: 'kkp.' },
            { type: 'success', content: 'sudu kkp' },
          ];
        }
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event.' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  // 自定义日期渲染
  const dateCellRender = (value) => {
    const data = getListData(value);
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
            {selectedList.map((item) => (
              <List.Item key={item.content} style={{ fontSize: 16 }}>
                <Badge status={item.type} /> {item.content}
              </List.Item>
            ))}
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
