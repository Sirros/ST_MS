import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Steps,
  Button,
  message,
  Form,
  Space,
  Input,
  Select,
  Radio,
  DatePicker,
  Typography,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { connect } from 'umi';
import _ from 'lodash';
import styles from './styles/data.less';
import moment from 'moment';

const { Step } = Steps;
const { Option } = Select;
const { Title } = Typography;

const sub_DataResult = ({ dispatch, postStatus }) => {
  const [form] = Form.useForm();
  const [current, setCurrent] = React.useState(0);
  const [matchInfo, setMatchInfo] = useState({});
  const [matchDetail, setMatchDetail] = useState([]);
  const [optionsList, setOptionsList] = useState([]);

  const matchRef = useRef();
  const detailRef = useRef();

  useEffect(() => {
    dispatch({
      type: 'sub_dataResult/getData',
    });
  }, []);

  useEffect(() => {
    console.log(postStatus);
    if (postStatus.list && postStatus.list.length) {
      setOptionsList(postStatus.list);
    }
    if (postStatus.status === 200) {
      message.success('上传成功😊～');
      setCurrent(0);
      setMatchInfo({});
      setMatchDetail([]);
      form.resetFields(); // 重置表单
    }
  }, [postStatus]);

  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 9,
    },
  };

  // 不可选时间
  const disabledDate = (current) => {
    // 不能选择今天之后的日期
    return current && current > moment().endOf('day');
  };
  const disabledDateTime = () => {
    return {
      disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 20, 21, 22, 23, 24],
    };
  };

  // 上一步
  const prev = () => {
    setCurrent(current - 1);
  };
  // 下一步
  const next = () => {
    if (current === 0) {
      const formData = matchRef.current.getFieldsValue();
      if (Object.values(formData).some((item) => !item)) {
        message.warn('数据请填写完整！');
      } else {
        const _g = Object.values(formData.guest).some((item) => !item || isNaN(item));
        const _h = Object.values(formData.home).some((item) => !item || isNaN(item));
        if (_g || _h) {
          message.warn('数据请填写完整，并且确保数据类型正确！');
        } else {
          formData.time = moment(formData.time).valueOf();
          setMatchInfo(formData);
          setCurrent(current + 1);
        }
      }
    } else {
      const detailData = detailRef.current.getFieldsValue().personalData;
      if (!detailData || detailData.length < 5) {
        message.warn('请添加五条以上数据～');
      } else {
        if (detailData.some((item) => !item.name)) {
          message.warn('请务必填写姓名！');
        } else {
          setMatchDetail(detailData);
          setCurrent(current + 1);
        }
      }
    }
  };
  // 完成
  const done = () => {
    console.log(matchInfo);
    console.log(matchDetail);
    dispatch({
      type: 'sub_dataResult/postData',
      payload: {
        matchInfo,
        matchDetail,
      },
    });
  };

  // 第一步
  function renderCreateMatch() {
    const firstStr = '第一节主队得分';
    const secondStr = '第二节主队得分';
    const thirdStr = '第三节主队得分';
    const fouthStr = '第四节主队得分';
    const _placeholder = '请输入具体分数';

    return (
      <Form
        ref={matchRef}
        {...layout}
        form={form}
        name="match-info"
        className={styles.myFormWrapper}
        initialValues={{
          opponent: 'xx',
          hostGuest: 'home',
          home: {
            first: '1',
            second: '2',
            third: '3',
            fouth: '4',
          },
          guest: {
            first: '5',
            second: '6',
            third: '7',
            fouth: '8',
          },
        }}
      >
        <Form.Item
          name="opponent"
          label="对阵"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input style={{ width: '80%' }} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="主/客(己方)"
          name="hostGuest"
        >
          <Radio.Group>
            <Radio.Button value="home">主队</Radio.Button>
            <Radio.Button value="guest">客队</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="time"
          label="比赛时间"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }}
          />
        </Form.Item>
        <Form.Item label="节次比分">
          <Input.Group compact>
            <Form.Item
              name={['home', 'first']}
              noStyle
              rules={[{ required: true, message: _placeholder }]}
            >
              <Input className={styles.inputItem} placeholder={firstStr} />
            </Form.Item>
            <Form.Item
              name={['guest', 'first']}
              noStyle
              rules={[{ required: true, message: _placeholder }]}
            >
              <Input className={styles.inputItem} placeholder={firstStr} />
            </Form.Item>
            <Form.Item
              name={['home', 'second']}
              noStyle
              rules={[{ required: true, message: _placeholder }]}
            >
              <Input className={styles.inputItem} placeholder={secondStr} />
            </Form.Item>
            <Form.Item
              name={['guest', 'second']}
              noStyle
              rules={[{ required: true, message: _placeholder }]}
            >
              <Input className={styles.inputItem} placeholder={secondStr} />
            </Form.Item>
            <Form.Item
              name={['home', 'third']}
              noStyle
              rules={[{ required: true, message: _placeholder }]}
            >
              <Input className={styles.inputItem} placeholder={thirdStr} />
            </Form.Item>
            <Form.Item
              name={['guest', 'third']}
              noStyle
              rules={[{ required: true, message: _placeholder }]}
            >
              <Input className={styles.inputItem} placeholder={thirdStr} />
            </Form.Item>
            <Form.Item
              name={['home', 'fouth']}
              noStyle
              rules={[{ required: true, message: _placeholder }]}
            >
              <Input className={styles.inputItem} placeholder={fouthStr} />
            </Form.Item>
            <Form.Item
              name={['guest', 'fouth']}
              noStyle
              rules={[{ required: true, message: _placeholder }]}
            >
              <Input className={styles.inputItem} placeholder={fouthStr} />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </Form>
    );
  }

  // 第二步
  function renderDataImport() {
    const item_list = [
      { label: '得分', uid: 'score', rule: false, msg: '请输入得分' },
      { label: '篮板', uid: 'rebound', rule: false, msg: '请输入篮板数' },
      { label: '助攻', uid: 'assist', rule: false, msg: '请输入助攻次数' },
      { label: '抢断', uid: 'steal', rule: false, msg: '请输入抢断次数' },
      { label: '盖帽', uid: 'block', rule: false, msg: '请输入盖帽次数' },
      { label: '失误', uid: 'fault', rule: false, msg: '请输入失误次数' },
      { label: '犯规', uid: 'foul', rule: false, msg: '请输入犯规次数' },
      { label: '投篮', uid: 'shot', rule: false, msg: '请输入投篮次数' },
      { label: '三分', uid: 'threepoint', rule: false, msg: '请输入三分进球数' },
    ];
    return (
      <>
        <Form form={form} name="match-details" ref={detailRef} autoComplete="off">
          <Form.List name="personalData">
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map((field) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.name !== curValues.name ||
                          prevValues.score !== curValues.score ||
                          prevValues.rebound !== curValues.rebound ||
                          prevValues.assist !== curValues.assist ||
                          prevValues.steal !== curValues.steal ||
                          prevValues.block !== curValues.block ||
                          prevValues.fault !== curValues.fault ||
                          prevValues.foul !== curValues.foul ||
                          prevValues.shot !== curValues.shot ||
                          prevValues.threepoint !== curValues.threepoint
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            name={[field.name, 'name']}
                            fieldKey={[field.fieldKey, 'name']}
                            rules={[{ required: true, message: '请选择队员' }]}
                          >
                            <Select
                              showSearch
                              style={{ width: 200 }}
                              placeholder="请选择人员"
                              optionFilterProp="children"
                              // onChange={onChange}
                              // onFocus={onFocus}
                              // onBlur={onBlur}
                              // onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {optionsList &&
                                optionsList.map((option) => {
                                  return (
                                    <Option value={option.name} key={option.key}>
                                      {option.name}
                                    </Option>
                                  );
                                })}
                            </Select>
                          </Form.Item>
                        )}
                      </Form.Item>
                      {item_list.map((renderItem) => {
                        const { label, uid, rule, msg } = renderItem;
                        return (
                          <Form.Item
                            key={uid}
                            {...field}
                            name={[field.name, uid]}
                            fieldKey={[field.fieldKey, uid]}
                            rules={[{ required: rule, message: msg }]}
                          >
                            <Input placeholder={label} />
                          </Form.Item>
                        );
                      })}
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Button
                      type="dashed"
                      style={{ width: '65%' }}
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加一组数据
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </Form>
      </>
    );
  }

  // 第三步备注
  function renderRemark() {
    return (
      <div className={styles.doneArea}>
        <Title>
          录入成功！
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        </Title>
      </div>
    );
  }

  const steps = [
    {
      title: '创建比赛',
      content: renderCreateMatch(),
    },
    {
      title: '运动员数据录入',
      content: renderDataImport(),
    },
    {
      title: '完成',
      content: renderRemark(),
    },
  ];

  // 内容区域
  function renderContentArea() {
    return (
      <>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className={styles.stepsContent}>{steps[current].content}</div>
        <div className={styles.stepsAction}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={done}>
              完成
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              上一步
            </Button>
          )}
        </div>
      </>
    );
  }

  return (
    <PageContainer>
      <Card>{renderContentArea()}</Card>
    </PageContainer>
  );
};

export default connect(({ sub_dataResult }) => ({
  postStatus: sub_dataResult,
}))(sub_DataResult);
