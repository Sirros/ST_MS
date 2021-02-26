import React, { useState } from 'react';
// antd相关
import { Badge, Upload, Divider, Radio, Drawer, Row, Col, Button, Form, Input, Space } from 'antd';
import ProForm, {
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormSelect,
  ProFormDateTimeRangePicker,
  ProFormDateTimePicker,
  ProFormUploadDragger,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ImgCrop from 'antd-img-crop';
// 富文本编辑器相关
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
// 自定义样式相关
import { formWrapper, tipsText, displayBox } from './styleComponent';

export default () => {
  const [fileList, setFileList] = useState([]);
  const [selected, setSelected] = useState('simpleText');
  const [visible, setVisible] = useState(false);
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
  const [powerInner, setPowerInner] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [selectAnnoType, setSelectAnnoType] = useState('drill');

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  // 徽标列表
  const colors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
  ];

  const badgeOption = colors.map((c) => {
    return {
      label: <Badge color={c} text={c} />,
      value: c,
    };
  });
  // 富文本提交
  const handlePowerTextSubmit = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    // const htmlContent = this.state.editorState.toHTML()
    const eleInnerText = document.querySelector('#displayArea').innerText;
    setVisible(false);
    setPowerInner(eleInnerText);
    setIsDisable(false);
    if (eleInnerText) {
      setIsDisable(true);
    }
  };

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  // drawer 关闭
  const handleDrawerClose = () => {
    setVisible(false);
  };

  // 选择按钮更改
  const handleRadioChange = (e) => {
    setSelected(e.target.value);
  };

  // 图片添加
  const pic_onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // 图片预览
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  // 富文本显示区域聚焦
  const handleOnBoxClick = () => {
    setVisible(true);
    setEditorState(BraftEditor.createEditorState(document.querySelector('#displayArea').innerHTML));
  };

  // 表单提交
  const handleFormSubmit = (v) => {
    console.log(editorState.toHTML());
    v.file = v.file.concat(fileList);
    if (!v.noticeContent) {
      v.noticeContent = editorState.toHTML();
    }
    console.log(v);
  };

  const handleFormValueChange = (_, values) => {
    console.log(_);
    if (_.annoType) {
      setSelected(_.annoType);
    }
    if (_.noticeAttr) {
      setSelectAnnoType(_.noticeAttr);
    }
  };

  // 标题
  function renderTitle() {
    return (
      <ProFormText
        width="lg"
        label="标题"
        name="noticeTitle"
        laceholder="请填写 公告/日程 标题"
        rules={[{ required: true, message: '请填写 公告/日程 标题!' }]}
      />
    );
  }

  // 内容块/富文本
  function renderEditType() {
    return (
      <>
        <ProForm.Group style={{ marginBottom: 10 }}>
          <Radio.Group onChange={handleRadioChange} value={selected}>
            <Radio disabled={isDisable} value="simpleText">
              普通内容块
            </Radio>
            <Radio value="powerText">富文本编辑器</Radio>
          </Radio.Group>
        </ProForm.Group>
      </>
    );
  }

  // 富文本编辑器
  function renderPowerText() {
    return (
      <>
        {/* <TextArea style={{width: '300px'}} onFocus={handleOnBoxClick} value={powerInner} /> */}
        <div
          id="displayArea"
          className="braft-output-content"
          style={displayBox}
          onClick={handleOnBoxClick}
          dangerouslySetInnerHTML={{ __html: editorState.toHTML() }}
        ></div>
        <Drawer
          title="富文本编辑器"
          placement="right"
          closable={false}
          onClose={handleDrawerClose}
          width="600"
          visible={visible}
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button onClick={handleDrawerClose} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={handlePowerTextSubmit} type="primary">
                提交
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="dw">
                  <div className="my-component">
                    <BraftEditor
                      value={editorState}
                      onChange={handleEditorChange}
                      onSave={handlePowerTextSubmit}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }

  // 属性选择
  function renderAnnoType() {
    return (
      <ProFormSelect
        name="noticeAttr"
        label="公告属性"
        width="lg"
        valueEnum={{
          drill: '训练',
          match: '比赛',
          daily: '日常',
        }}
        rules={[{ required: true, message: '请选择公告内容属性!' }]}
      />
    );
  }

  // 地点
  function renderSite() {
    return (
      <ProFormSelect
        name="site"
        label="场地"
        width="lg"
        valueEnum={{
          court_2: '二号场',
          court_3: '三号场',
          other: '待定',
        }}
        rules={[{ required: true, message: '请选择公告内容属性!' }]}
      />
    );
  }

  // 徽标选择
  function renderBadgeSelect() {
    return (
      <ProFormRadio.Group
        name="badgeSelect"
        label="公告徽标选择"
        radioType="button"
        options={badgeOption}
      />
    );
  }

  // 时间 / 时间区间选择
  function renderTimeSelect(type) {
    if (type === 'drill') {
      return <ProFormDateTimeRangePicker width="lg" name="dateTimeRange" label="日期时间区间" />;
    } else {
      return <ProFormDateTimePicker name="dateTime" width="lg" label="日期时间" />;
    }
  }

  // 文件上传
  function renderUploadDragger() {
    return <ProFormUploadDragger max={10} width="lg" label="文件/图片" name="file" />;
  }

  // 图片剪裁/预览上传
  function renderImgCrop() {
    return (
      <>
        <span style={tipsText}>如果图片需预览/剪裁/旋转，请选用以下方式上传图片</span>
        <ImgCrop rotate>
          <Upload
            action=""
            icon=""
            listType="picture-card"
            fileList={fileList}
            onChange={pic_onChange}
            onPreview={onPreview}
          >
            {fileList.length < 10 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </>
    );
  }

  // 动态添加listitem
  function renderAddList() {
    const onFinish = (values) => {
      console.log('Received values of form:', values);
    };

    return (
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'first']}
                  fieldKey={[field.fieldKey, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'last']}
                  fieldKey={[field.fieldKey, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  }

  return (
    <PageContainer>
      <div style={formWrapper}>
        <ProForm
          title="anno form"
          initialValues={{
            file: [],
            noticeTitle: '',
            noticeContent: '',
            noticeAttr: 'drill',
            badgeSelect: '',
            annoType: selected,
            site: 'court_3',
          }}
          onValuesChange={handleFormValueChange}
          onFinish={async (value) => {
            handleFormSubmit(value);
          }}
        >
          {renderTitle()}
          {renderAnnoType()}
          {renderSite()}
          {renderTimeSelect(selectAnnoType)}
          {renderAddList()}
          {renderEditType()}
          {selected === 'simpleText' ? (
            <ProFormTextArea name="noticeContent" width="lg" placeholder="请填写公告内容" />
          ) : null}
          {selected === 'powerText' && renderPowerText()}
          {renderBadgeSelect()}
          {renderUploadDragger()}
          <Divider dashed />
          {renderImgCrop()}
          <Divider dashed />
        </ProForm>
      </div>
    </PageContainer>
  );
};
