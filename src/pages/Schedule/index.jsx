import React, { Component } from 'react';
import {
  Calendar, Badge, Row, Col,
  List
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import moment from 'moment';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDate: moment(),
      selectedDate: moment(),
      selectedList: []
    };
  }
  // 日期选择回调
  handleSelect = (value) => {
    const data = this.getListData(value)
    this.setState({
      defaultDate: value,
      selectedDate: value,
      selectedList: data
    })
  }
   
  // 获取数据
  getListData = (value) => {
    let listData;
    switch(value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
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
  }

  // 自定义日期渲染
  dateCellRender = (value) => {
    const data = this.getListData(value);
    return (
      <ul className={styles.Events}>
        {
          data.map(item => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))
        }
      </ul>
    )
  }

  render() {
    return (
      <PageContainer>
        <Row gutter={5} className={styles.Wrapper}>
          <Col span={9}>
            当前选择日期：{this.state.selectedDate.format('YYYY-MM-DD')}
            <List>
              {
                this.state.selectedList.map(item => (
                  <List.Item key={item.content}>
                    {item.content}
                  </List.Item>
                ))
              }
            </List>
          </Col>
          <Col span={15} style={{borderLeft: '1px solid #e4e4e4'}}>
            <Calendar
              value={this.state.defaultDate}
              onSelect={this.handleSelect}
              dateCellRender={this.dateCellRender}
            />
          </Col>
        </Row>
      </PageContainer>
    );
  }
}

export default Schedule;