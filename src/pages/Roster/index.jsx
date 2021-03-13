import React, { useState, useEffect, useRef } from 'react';
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
import { QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
// import { connect } from 'umi';
import avatar from '@/assets/01.jpg';

const { Meta } = Card;
const tempData = [
  {
    key: 1,
    name: '温蒂',
    attr: '队长',
    studentId: '2017141463199',
    grade: '2017',
    height: '182',
    weight: '83',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
  {
    key: 2,
    name: '来了',
    attr: '队长',
    studentId: '2017141463192',
    grade: '2017',
    height: '192',
    weight: '93',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
  {
    key: 3,
    name: '温蒂',
    attr: '队员',
    studentId: '2017141463192',
    grade: '2016',
    height: '172',
    weight: '73',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
  {
    key: 4,
    name: '温蒂',
    attr: '队员',
    studentId: '2017141463192',
    grade: '2017',
    height: '182',
    weight: '83',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
  {
    key: 5,
    name: '温蒂',
    attr: '队员',
    studentId: '2017141463192',
    grade: '2017',
    height: '182',
    weight: '83',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
  {
    key: 6,
    name: '温蒂',
    attr: '队员',
    studentId: '2017141463192',
    grade: '2017',
    height: '182',
    weight: '83',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
  {
    key: 7,
    name: '温蒂',
    attr: '经理',
    studentId: '2017141463192',
    grade: '2017',
    height: '182',
    weight: '83',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
  {
    key: 8,
    name: '温蒂',
    attr: '经理',
    studentId: '2017141463192',
    grade: '2017',
    height: '182',
    weight: '83',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
  {
    key: 9,
    name: '温蒂',
    attr: '队员',
    studentId: '2017141463192',
    grade: '2017',
    height: '182',
    weight: '83',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
  {
    key: 10,
    name: '温蒂',
    attr: '队员',
    studentId: '2017141463192',
    grade: '2017',
    height: '182',
    weight: '83',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
  {
    key: 11,
    name: '温蒂',
    attr: '队员',
    studentId: '2017141463192',
    grade: '2017',
    height: '182',
    weight: '83',
    jersey_number: '1',
    charge: 'C/PF',
    em: '121970263@qq.com',
    birthday: '1998-08-03',
    phone: '13032867907',
    description: '暂无备注信息',
  },
];

const Roster = () => {
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState(tempData);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [inputText, setInputText] = useState('');

  const searchInput = useRef(null);

  // table inline search func
  const getColumnSearchProps = (dataIndex) => {
    const helper = (selectedKeys, confirm, dataIndex) => {};
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={helper(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={helper(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                搜索
              </Button>
              <Button
                // onClick={handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                重置
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    };
  };

  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText('');
  // };

  const setShow = () => {
    setIsShow(!isShow);
  };

  // table render func
  const renderTable = (c) => {
    return (
      <Table
        columns={c}
        dataSource={data}
        style={{ marginTop: 15 }}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>, // 展开内容 description
          rowExpandable: (record) => record.name !== 'Not Expandable', // 根据 name 控制可否展开，可更改
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
          {data &&
            data.map((item) => {
              if (item.attr === '队长' || item.attr === '经理') {
                return (
                  <Col key={item.key} span={6} style={{ marginBottom: 15 }}>
                    <Card
                      hoverable={true}
                      bordered={false}
                      cover={<Image alt="avatar" src={avatar} />}
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
          {data &&
            data.map((item) => {
              if (item.attr === '队员') {
                return (
                  <Col key={item.key} span={6} style={{ marginBottom: 15 }}>
                    <Card
                      hoverable={true}
                      bordered={false}
                      cover={<Image alt="avatar" src={avatar} />}
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
    const res = data.filter((i) => {
      return (
        i.studentId.indexOf(inputText) > -1 ||
        i.name.indexOf(inputText) > -1 ||
        i.grade.indexOf(inputText) > -1
      );
    });
    setData(res);
  };

  const handleMyReset = () => {
    setData(tempData);
  };

  const handleMyChange = (e) => {
    setInputText(e.target.value);
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 100,
      ...getColumnSearchProps('name'),
    },
    {
      title: '属性',
      dataIndex: 'attr',
      key: 'attr',
      width: 100,
      ...getColumnSearchProps('attr'),
    },
    {
      // 自定义渲染
      title: '照片',
      dataIndex: 'avatar',
      key: 'avatar',
      render: () => (
        <Avatar src={avatar} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
      ),
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      sorter: (a, b) => a.studentId - b.studentId,
      ...getColumnSearchProps('studentId'),
    },
    {
      title: '年级',
      dataIndex: 'grade',
      key: 'grade',
      sorter: (a, b) => a.grade - b.grade,
      ...getColumnSearchProps('grade'),
    },
    {
      title: '身高/厘米',
      dataIndex: 'height',
      key: 'height',
      sorter: (a, b) => a.height - b.height,
      ...getColumnSearchProps('height'),
    },
    {
      title: '体重/斤',
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a, b) => a.weight - b.weight,
      ...getColumnSearchProps('weight'),
    },
    {
      title: '号码',
      dataIndex: 'jersey_number',
      key: 'jersey_number',
      sorter: (a, b) => a.jersey_number - b.jersey_number,
      ...getColumnSearchProps('jersey_number'),
    },
    { title: '位置', dataIndex: 'charge', key: 'charge', ...getColumnSearchProps('charge') },
    { title: '邮箱', dataIndex: 'em', key: 'em', ...getColumnSearchProps('em') },
    { title: '生日', dataIndex: 'birthday', key: 'birthday' },
    { title: '电话', dataIndex: 'phone', key: 'phone', ...getColumnSearchProps('phone') },
  ];

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

export default Roster;
