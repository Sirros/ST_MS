import React, { useState, useEffect } from 'react';
import {
  Upload,
  Divider,
  Radio,
  Drawer,
  Row,
  Col,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import ImgCrop from 'antd-img-crop';
// 富文本编辑器相关
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
// 自定义样式相关
import { formWrapper, tipsText, displayBox } from './styleComponent';
import styles from './index.less';

export default () => {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
  const [editMode, setEditMode] = useState('list');
  const [eventType, setEventType] = useState('drill');
  const [isCourtRequired, setIsCourtRequired] = useState(true);
  const [isTimeRequired, setIsTimeRequired] = useState(true);

  const [form] = Form.useForm();
  const { Option } = Select;

  const onValuesChange = (values) => {
    console.log(values);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 2 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 10 },
      sm: { span: 10 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 10, offset: 2 },
      sm: { span: 10, offset: 2 },
    },
  };

  // 地点改变
  const onSiteChange = (site) => {
    console.log(site);
  };

  // 类型改变
  const onTypeChange = (type) => {
    console.log(type);
    setEventType(type);
    if (type === 'daily') {
      setIsCourtRequired(false);
      setIsTimeRequired(false);
    } else {
      setIsCourtRequired(true);
      setIsTimeRequired(true);
    }
  };

  // 提交
  const onFinish = (values) => {
    const { dateTime } = values;
    if (values.powerContent) {
      values.powerContent = values.powerContent.toHTML(); // 富文本内容转 html
    }
    values.dateTime = moment(dateTime).valueOf(); // 转时间戳
    console.log(values);
  };

  // 重置
  const onReset = () => {
    form.resetFields();
    setEditMode('list');
  };

  // 表单值改变
  const handleOnValuesChange = (changing) => {
    if (changing.editMode) {
      setEditMode(changing.editMode);
    }
  };

  // 表单基本项
  function renderBasicFunc() {
    return (
      <>
        <Form.Item
          name="title"
          label="标题"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="请输入标题" allowClear />
        </Form.Item>
        <Form.Item
          name="eventType"
          label="类型"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select placeholder="请选择类型" onChange={onTypeChange} allowClear>
            <Option value="drill">训练</Option>
            <Option value="match">比赛</Option>
            <Option value="daily">日常事务</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="site"
          label="地点"
          rules={[
            {
              required: isCourtRequired,
            },
          ]}
        >
          <Select placeholder="请选择场地" onChange={onSiteChange} allowClear>
            <Option value="court_2">二号场</Option>
            <Option value="court_3">三号场</Option>
            <Option value="other">待定</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="dateTime"
          rules={[
            {
              required: isTimeRequired,
            },
          ]}
          label="时间"
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item name="editMode" label="编辑模式">
          <Radio.Group>
            <Radio value="list">列表</Radio>
            <Radio value="simpleText">纯文本</Radio>
            <Radio value="powerText">富文本</Radio>
          </Radio.Group>
        </Form.Item>
      </>
    );
  }

  // 列表模式
  function renderListEvents() {
    return (
      <Form.List
        name="events"
        rules={[
          {
            validator: async (_, events) => {
              if (!events || events.length < 1) {
                return Promise.reject(new Error('至少有一条内容'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '事件列表' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入内容',
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="请输入内容" style={{ width: '90%' }} allowClear />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className={styles.dynamicDeleteButton}
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                尾部添加
              </Button>
              <Button
                type="dashed"
                onClick={() => {
                  add('', 0);
                }}
                style={{ width: '60%', marginTop: '20px' }}
                icon={<PlusOutlined />}
              >
                头部添加
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  }

  // 纯文本模式
  function renderSimpleText() {
    return (
      <Form.Item
        name="simpleText"
        label="内容"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea placeholder="请输入标题" allowClear />
      </Form.Item>
    );
  }

  // 富文本模式
  function renderPowerText() {
    return (
      <Form.Item
        name="powerContent"
        rules={[
          {
            required: isTimeRequired,
          },
        ]}
        label="内容"
      >
        <BraftEditor className={styles.powerStyle} placeholder="请输入正文内容" />
      </Form.Item>
    );
  }

  return (
    <PageContainer>
      <div style={formWrapper}>
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{
            title: '默认',
            site: 'court_3',
            editMode: 'list',
            eventType: 'drill',
            powerContent: editorState,
          }}
          name="anno-form"
          onFinish={onFinish}
          onValuesChange={handleOnValuesChange}
        >
          {renderBasicFunc()}
          {editMode === 'list' && renderListEvents()}
          {editMode === 'simpleText' && renderSimpleText()}
          {editMode === 'powerText' && renderPowerText()}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
              发布
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageContainer>
  );
};
