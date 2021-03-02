import React, { useState, useEffect } from 'react';
import {
  List,
  Typography,
  Divider,
  Card,
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  Radio,
  DatePicker,
  Switch,
  message,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';
import { getDifference } from '@/utils/utils.js';
import styles from './index.less';

export default () => {
  const [visible, setVisible] = useState(false);
  const [selectType, setSelectType] = useState('anta');
  const [switchState, setSwitchState] = useState(true);
  const [initialValues, setInitialValues] = useState();
  const [editableStr, setEditableStr] = useState('');
  //test api hook
  const [currentUser, setCurrentUser] = useState('captain');
  const _antaData = [
    { key: 1, text: '2020 a' },
    { key: 2, text: '2019 a' },
    { key: 3, text: '2018 a' },
    { key: 4, text: '2017 a' },
    { key: 5, text: '2016 a' },
    { key: 6, text: '2015 a' },
  ];

  const _freshmanData = [
    { key: 1, text: '2020 f' },
    { key: 2, text: '2019 f' },
    { key: 3, text: '2018 f' },
    { key: 4, text: '2017 f' },
    { key: 5, text: '2016 f' },
    { key: 6, text: '2015 f' },
  ];
  const [antaData, setAntaData] = useState(_antaData);
  const [freshmanData, setFreshmanData] = useState(_freshmanData);

  const { Option } = Select;
  const [form] = Form.useForm();
  const { Paragraph } = Typography;

  useEffect(() => {
    const _temp = {
      type: 'anta',
    };
    for (let i = 0; i < antaData.length; i++) {
      _temp[`anta_info_${antaData[i].key}`] = antaData[i].text;
    }
    for (let j = 0; j < freshmanData.length; j++) {
      _temp[`fresh_info_${freshmanData[j].key}`] = freshmanData[j].text;
    }
    setInitialValues(_temp);
  }, [switchState]);

  const showDrawer = () => {
    setVisible(true);
  };

  const handleTypeChange = (e) => {
    setSelectType(e.target.value);
  };

  const handleSwitchChange = (value, e) => {
    setSwitchState(value);
  };

  function difference(object, base) {
    function changes(object, base) {
      return _.transform(object, function (result, value, key) {
        if (!_.isEqual(value, base[key])) {
          result[key] =
            _.isObject(value) && _.isObject(base[key]) ? changes(value, base[key]) : value;
        }
      });
    }
    return changes(object, base);
  }

  // 表单提交
  const handleFormFinish = (value) => {
    const { type, dateTime } = value;
    let _diff = null;
    // 如果是修改则要过滤，过滤出修改了的item
    if (value.hasOwnProperty('type')) {
      value.dateTime = moment(dateTime).valueOf();
      if (type === 'anta') {
        // 接口请求 新建「32」院荣誉
        message.info('新建「32」院荣誉');
        console.log(value);
      } else {
        // 接口请求 新建「新生杯」荣誉
        message.info('新建「新生杯」荣誉');
        console.log(value);
      }
    } else {
      // 如果是修改，则没有创建类型和时间这两个key，直接删除
      delete value.dateTime;
      delete initialValues.type;

      if (_.isEqual(initialValues, value)) {
        message.info('荣誉无变更');
      } else {
        // 找出修改项
        _diff = getDifference(value, initialValues);
        console.log(_diff);
        message.success('荣誉发生变更');
      }
    }
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
    setSwitchState(true);
  };

  const handleOnReset = () => {
    form.resetFields();
  };

  const handleEditableChange = (str) => {
    console.log(str);
    setEditableStr(str);
  };

  function newHonorArea() {
    return (
      <>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="type" label="类型" rules={[{ required: true, message: '请选择类型' }]}>
              <Radio.Group onChange={handleTypeChange}>
                <Radio.Button value="anta">江安杯/32院</Radio.Button>
                <Radio.Button value="freshman">新生杯</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="info"
              label="荣誉"
              rules={[{ required: true, message: '请输入具体荣誉' }]}
            >
              <Input placeholder="请输入具体荣誉" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateTime"
              label="日期"
              rules={[{ required: true, message: '请选择获得荣誉日期' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }

  // 32院荣誉编辑
  function editAnta() {
    return (
      !switchState && (
        <>
          <Row gutter={16}>
            <Col span={24}>
              <Divider dashed orientation="center">
                江安杯/32院
              </Divider>
            </Col>
          </Row>
          {antaData.map((item) => {
            return (
              <Row gutter={16} key={item.key}>
                <Col span={24}>
                  <Form.Item
                    name={`anta_info_${item.key}`}
                    label={`荣誉 - ${item.key}`}
                    rules={[{ required: true, message: '请输入具体荣誉' }]}
                  >
                    <Input placeholder="请输入具体荣誉" />
                  </Form.Item>
                </Col>
              </Row>
            );
          })}
        </>
      )
    );
  }

  // 新生杯荣誉编辑
  function editFreshMan() {
    return (
      <>
        <Row gutter={16}>
          <Col span={24}>
            <Divider dashed orientation="center">
              新生杯
            </Divider>
          </Col>
        </Row>
        {freshmanData.map((item) => {
          return (
            <Row gutter={16} key={item.key}>
              <Col span={24}>
                <Form.Item
                  name={`fresh_info_${item.key}`}
                  label={`荣誉 - ${item.key}`}
                  rules={[{ required: true, message: '请输入具体荣誉' }]}
                >
                  <Input placeholder="请输入具体荣誉" />
                </Form.Item>
              </Col>
            </Row>
          );
        })}
      </>
    );
  }

  // 编辑区
  function renderEditDrawer() {
    return (
      <>
        <Drawer
          title="编辑"
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            layout="vertical"
            form={form}
            hideRequiredMark
            onFinish={handleFormFinish}
            initialValues={initialValues}
          >
            <Row gutter={16}>
              <Col span={24} style={{ marginBottom: 15 }}>
                <Switch
                  checkedChildren="新建"
                  unCheckedChildren="编辑"
                  defaultChecked
                  onChange={handleSwitchChange}
                />
              </Col>
            </Row>

            {!!switchState && newHonorArea()}
            {!switchState && editAnta()}
            {!switchState && editFreshMan()}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
                    提交
                  </Button>
                  <Button htmlType="button" onClick={handleOnReset}>
                    重置
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }

  // 主要信息
  function renderHonorInfo() {
    return (
      <>
        {currentUser === 'captain' && (
          <>
            <div style={{ marginBottom: 5 }}>
              <Button onClick={showDrawer}>新建/编辑荣誉</Button>
            </div>
          </>
        )}
        <div className={styles.anta}>
          <Divider dashed orientation="center">
            江安杯/32院
          </Divider>
          <List
            dataSource={antaData}
            renderItem={(item) => <List.Item key={item.key}>{item.text}</List.Item>}
          />
        </div>
        <div className={styles.freshman}>
          <Divider dashed orientation="center">
            新生杯
          </Divider>
          <List
            dataSource={freshmanData}
            renderItem={(item) => <List.Item key={item.key}>{item.text}</List.Item>}
          />
        </div>
      </>
    );
  }

  return (
    <PageContainer>
      <Card>{renderHonorInfo()}</Card>
      {!!visible && renderEditDrawer()}
    </PageContainer>
  );
};
