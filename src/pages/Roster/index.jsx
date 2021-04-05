import React, { useState, useEffect } from 'react';
import {
  Badge,
  Table,
  Space,
  Switch,
  Row,
  Col,
  Card,
  Tooltip,
  Image,
  Avatar,
  Input,
  Button,
  Divider,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { connect } from 'umi';

const { Meta } = Card;

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 100,
  },
  {
    title: '属性',
    dataIndex: 'attr',
    key: 'attr',
    width: 100,
  },
  {
    // 自定义渲染
    title: '照片',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (r, avatar) => (
      <Avatar src={avatar.avatar} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
    ),
  },
  {
    title: '学号',
    dataIndex: 'studentId',
    key: 'studentId',
    sorter: (a, b) => a.studentId - b.studentId,
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
    sorter: (a, b) => a.grade - b.grade,
  },
  {
    title: '身高/厘米',
    dataIndex: 'height',
    key: 'height',
    sorter: (a, b) => a.height - b.height,
  },
  {
    title: '体重/斤',
    dataIndex: 'weight',
    key: 'weight',
    sorter: (a, b) => a.weight - b.weight,
  },
  {
    title: '号码',
    dataIndex: 'jersey_number',
    key: 'jersey_number',
    sorter: (a, b) => a.jersey_number - b.jersey_number,
  },
  { title: '位置', dataIndex: 'charge', key: 'charge' },
  { title: '邮箱', dataIndex: 'em', key: 'em' },
  { title: '生日', dataIndex: 'birthday', key: 'birthday' },
  { title: '电话', dataIndex: 'phone', key: 'phone' },
];

const Roster = ({ totalPerson, dispatch }) => {
  const [isShow, setIsShow] = useState(false);
  const [inputText, setInputText] = useState('');
  const [totalMembers, setTotalMembers] = useState([]);
  const [tempArr, setTempArr] = useState([]);
  const [players, setPlayers] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'roster/getTotalPerson',
    });
  }, []);

  useEffect(() => {
    const { total } = totalPerson;
    const { players = [], managers = [] } = total;
    setPlayers(players);
    setManagers(managers);
    setTotalMembers([...players, ...managers]);
    setTempArr([...players, ...managers]);
  }, [totalPerson]);

  const setShow = () => {
    setIsShow(!isShow);
  };

  // table render func
  const renderTable = (c) => {
    return (
      <Table
        columns={c}
        dataSource={totalMembers}
        style={{ marginTop: 15 }}
        expandable={{
          expandedRowRender: (record) => (
            <p key={record.studentId} style={{ margin: 0 }}>
              {record.remark || '暂无其他信息'}
            </p>
          ), // 展开内容 description
          // rowExpandable: (record) => record.name !== 'Not Expandable', // 根据 name 控制可否展开，可更改
        }}
        pagination
        scroll={{ x: 1500 }}
      />
    );
  };

  // card list render func
  const renderCardList = () => {
    return (
      <div style={{ marginTop: 15 }}>
        <h4 style={{ marginBottom: 5 }}>管理员</h4>
        <Row gutter={24} className={styles.cwrapper}>
          {managers &&
            managers.map((item) => {
              if (item.attr === '队长' || item.attr === '经理') {
                return (
                  <Col key={item.studentId} span={6} style={{ marginBottom: 15 }}>
                    <Card
                      hoverable={true}
                      bordered={false}
                      // 图片大小一致就可以使卡片看起来一致，但是不能设置image的大小
                      cover={<Image alt="avatar" src={item.avatar} />}
                    >
                      <Meta title={`${item.name}(${item.attr})`} description={item.studentId} />
                    </Card>
                  </Col>
                );
              }
            })}
        </Row>
        <Divider dashed />
        <h4 style={{ marginBottom: 5 }}>运动员</h4>
        <Row gutter={24} className={styles.cwrapper}>
          {players &&
            players.map((item) => {
              if (item.attr === '队员') {
                return (
                  <Col key={item.studentId} span={6} style={{ marginBottom: 15 }}>
                    <Card
                      hoverable={true}
                      bordered={false}
                      cover={<Image alt="avatar" src={item.avatar} />}
                    >
                      <Meta title={item.name} description={item.studentId} />
                    </Card>
                  </Col>
                );
              }
            })}
        </Row>
      </div>
    );
  };

  // tips render func
  const renderTips = () => {
    return (
      <Tooltip title="点击表格展开项查看运动员伤病信息">
        <a style={{ color: 'inherit', marginRight: 20 }} className={styles.action}>
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
    );
  };

  // table outline search func
  const handleMySearch = () => {
    const res = tempArr.filter((i) => {
      return (
        i.studentId.indexOf(inputText) > -1 ||
        i.name.indexOf(inputText) > -1 ||
        i.grade.indexOf(inputText) > -1
      );
    });
    setTotalMembers(res);
  };

  const handleMyReset = () => {
    setTotalMembers(tempArr);
    setInputText('');
  };

  const handleMyChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <PageContainer title="运动员信息">
      <Space>
        <Switch
          checked={isShow}
          onChange={setShow}
          checkedChildren="List View"
          unCheckedChildren="Table View"
        />
        {isShow ? (
          <span style={{ color: '#C0C0C0' }}>点击图片可放大预览</span>
        ) : (
          <span style={{ color: '#C0C0C0' }}>点击按钮切换视图</span>
        )}
        {isShow ? null : renderTips()}
        {isShow ? null : (
          <>
            <Input
              allowClear={true}
              value={inputText}
              onChange={(e) => {
                handleMyChange(e);
              }}
              placeholder="学号/年级/姓名"
              onPressEnter={handleMySearch}
            />
            <Button onClick={handleMySearch} style={{ border: 'none' }} type="primary">
              搜索
            </Button>
            <Button onClick={handleMyReset} style={{ border: 'none' }}>
              重置
            </Button>
          </>
        )}
      </Space>
      {isShow ? renderCardList() : renderTable(columns)}
    </PageContainer>
  );
};

export default connect(({ roster }) => ({
  totalPerson: roster,
}))(Roster);
