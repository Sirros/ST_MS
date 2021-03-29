import React, { useState, useEffect, useRef } from 'react';
import {
  List,
  Divider,
  Card,
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  Radio,
  DatePicker,
  Switch,
  message,
  Modal,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import _ from 'lodash';
import { getDifference } from '@/utils/utils.js';
import { connect } from 'umi';
import styles from './index.less';

const Honor = ({ dispatch, totalList }) => {
  const [visible, setVisible] = useState(false);
  const [selectType, setSelectType] = useState('anta');
  const [switchState, setSwitchState] = useState(true);
  const [initialValues, setInitialValues] = useState({
    type: 'anta',
  });

  const [antaData, setAntaData] = useState([]);
  const [freshmanData, setFreshmanData] = useState([]);
  const [updateType, setUpdateType] = useState('anta');

  const [confirmLoading, setConfirmLoading] = React.useState(false);

  //test api hook
  const [currentUser, setCurrentUser] = useState('captain');

  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef = useRef();

  useEffect(() => {
    dispatch({
      type: 'honor/getList',
    });
  }, []);

  useEffect(() => {
    console.log(totalList);
    const { anta, freshman } = totalList.honorList;
    setAntaData(anta);
    setFreshmanData(freshman);
  }, [totalList]);

  const showModal = () => {
    setVisible(true);
  };

  const handleTypeChange = (e) => {
    setSelectType(e.target.value);
  };

  const handleSwitchChange = (value, e) => {
    setSwitchState(value);
  };

  // 表单提交
  // const handleFormFinish = (value) => {
  //   const { type, dateTime } = value;
  //   let _diff = null;
  //   // 如果是修改则要过滤，过滤出修改了的item
  //   if (value.hasOwnProperty('type')) {
  //     value.dateTime = moment(dateTime).valueOf();
  //     if (type === 'anta') {
  //       // 接口请求 新建「32」院荣誉
  //       message.info('新建「32」院荣誉');
  //       console.log(value);
  //     } else {
  //       // 接口请求 新建「新生杯」荣誉
  //       message.info('新建「新生杯」荣誉');
  //       console.log(value);
  //     }
  //   } else {
  //     // 如果是修改，则没有创建类型和时间这两个key，直接删除
  //     delete value.dateTime;
  //     delete initialValues.type;

  //     if (_.isEqual(initialValues, value)) {
  //       message.info('荣誉无变更');
  //     } else {
  //       // 找出修改项
  //       _diff = getDifference(value, initialValues);
  //       console.log(_diff);
  //       message.success('荣誉发生变更');
  //     }
  //   }
  //   setVisible(false);
  // };

  const onClose = () => {
    setVisible(false);
    setSwitchState(true);
  };

  const modalOk = () => {
    const formData = formRef.current.getFieldsValue();
    if (Object.keys(formData).length && Object.keys(formData).includes('newVal')) {
      console.log('修改');
      dispatch({}); //修改请求
    } else {
      console.log('新建');
      dispatch({}); //新建请求
    }
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleEditTypeChange = (e) => {
    setUpdateType(e.target.value);
  };

  // const targetEventChange = (value) => {
  //   console.log(value);
  // };

  // 新建荣誉
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

  // 编辑
  function renderEdit() {
    return (
      <>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="type" label="类型" rules={[{ required: true, message: '请选择类型' }]}>
              <Radio.Group onChange={handleEditTypeChange}>
                <Radio.Button value="anta">江安杯/32院</Radio.Button>
                <Radio.Button value="freshman">新生杯</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="event"
              label="事件"
              rules={[{ required: true, message: '请选择具体荣誉' }]}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择具体荣誉"
                optionFilterProp="children"
                // onChange={targetEventChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {updateType === 'anta' &&
                  antaData.map((item) => (
                    <Option key={item.key} value={item.key}>
                      {item.text}
                    </Option>
                  ))}
                {updateType === 'freshman' &&
                  freshmanData.map((item) => (
                    <Option key={item.key} value={item.key}>
                      {item.text}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="newVal"
              label="修改为"
              rules={[{ required: true, message: '请输入修改后的内容' }]}
            >
              <Input placeholder="请输入修改后的内容" />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }

  // Modal
  function renderEditModal() {
    return (
      <>
        <Modal
          title="编辑"
          visible={visible}
          onOk={modalOk}
          confirmLoading={confirmLoading}
          onCancel={onClose}
        >
          <Form
            layout="vertical"
            form={form}
            ref={formRef}
            hideRequiredMark
            // onFinish={handleFormFinish}
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
            {!switchState && renderEdit()}
          </Form>
        </Modal>
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
              <Button onClick={showModal}>新建/编辑荣誉</Button>
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
      {!!visible && renderEditModal()}
    </PageContainer>
  );
};

export default connect(({ honor }) => ({
  totalList: honor,
}))(Honor);
