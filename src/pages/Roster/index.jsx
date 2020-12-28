import React, { useState } from 'react';
import {
  Badge, Table, Space, Switch,
  Row, Col, Card, Tooltip,
  Image, Avatar
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import avatar from '../../assets/logo-dribble.svg';


export default () => {
  const [show, setShow] = useState(false);

  function renderTable() {
    const columns = [
      { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 100 },
      { // 自定义渲染
        title: '照片',
        dataIndex: 'avatar',
        key: 'avatar',
        render: () => <Avatar src={avatar} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />,
      },
      { title: '学号', dataIndex: 'studentId', key: 'studentId', sorter: (a, b) => a.studentId - b.studentId,},
      { title: '年级', dataIndex: 'grade', key: 'grade', sorter: (a, b) => a.grade - b.grade, },
      { title: '身高/厘米', dataIndex: 'height', key: 'height', sorter: (a, b) => a.height - b.height, },
      { title: '体重/斤', dataIndex: 'weight', key: 'weight', sorter: (a, b) => a.weight - b.weight, },
      { title: '号码', dataIndex: 'jersey_number', key: 'jersey_number', sorter: (a, b) => a.jersey_number - b.jersey_number,},
      { title: '位置', dataIndex: 'charge', key: 'charge'},
      { title: '邮箱', dataIndex: 'em', key: 'em' },
      { title: '生日', dataIndex: 'birthday', key: 'birthday' },
      { title: '电话', dataIndex: 'phone', key: 'phone',},
    ];
    const data = [
      {
        key: 1,
        name: '温蒂',
        studentId: '2017141463192',
        grade: '2017',
        height: '182',
        weight: '83',
        jersey_number: '1',
        charge: 'C/PF',
        em: '121970263@qq.com',
        birthday: '1998-08-03',
        phone: '13032867907',
        description: '暂无备注信息'
      },
      {
        key: 2,
        name: '温蒂',
        studentId: '2017141463192',
        grade: '2017',
        height: '192',
        weight: '93',
        jersey_number: '1',
        charge: 'C/PF',
        em: '121970263@qq.com',
        birthday: '1998-08-03',
        phone: '13032867907',
        description: '暂无备注信息'
      },
      {
        key: 3,
        name: '温蒂',
        studentId: '2017141463192',
        grade: '2016',
        height: '172',
        weight: '73',
        jersey_number: '1',
        charge: 'C/PF',
        em: '121970263@qq.com',
        birthday: '1998-08-03',
        phone: '13032867907',
        description: '暂无备注信息'
      },
      {
        key: 4,
        name: '温蒂',
        studentId: '2017141463192',
        grade: '2017',
        height: '182',
        weight: '83',
        jersey_number: '1',
        charge: 'C/PF',
        em: '121970263@qq.com',
        birthday: '1998-08-03',
        phone: '13032867907',
        description: '暂无备注信息'
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>, // 展开内容 description
          rowExpandable: record => record.name !== 'Not Expandable', // 根据 name 控制可否展开，可更改
        }}
        pagination
        scroll={{ x: 1500 }}
      />
    )
  }
  
  function renderCardList() {
    return (
    <Card>
      <Image
        width={200}
        src={avatar}
      />
    </Card>)
    
  }
  
  return (
    <PageContainer title='运动员信息'>
      <Space>
        <Switch
          checked={show}
          onChange={() => {setShow(!show)}}
          checkedChildren='List View'
          unCheckedChildren='Table View'
          style={{marginBottom: 15}}
        />
      </Space>
      { show ? renderCardList() : renderTable() }
    </PageContainer>
  );
};
