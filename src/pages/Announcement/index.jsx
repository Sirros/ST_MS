import React, { Component } from 'react';
// antd相关
import {
  Badge, Upload, Divider, Radio,
  Drawer, Form, Row,  Col, Input,
  Button,
} from 'antd';
import ProForm, {
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormSelect,
  ProFormDateTimeRangePicker,
  ProFormUploadDragger,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ImgCrop from 'antd-img-crop';
// 富文本编辑器相关
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css'
// 自定义样式相关
import {
  formWrapper, tipsText, displayBox
} from './styleComponent';

// 徽标列表
const colors = [
  'pink', 'red', 'yellow', 'orange', 'cyan',
  'green', 'blue', 'purple', 'geekblue', 'magenta',
  'volcano', 'gold', 'lime',
];

const badgeOption = colors.map(c => {
  return {
    label: <Badge color={c} text={c} />,
    value: c,
  }
});

class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      selected: 'simpleText',   // radio当前选择
      visible: false,  // drwer是否打开
      editorState: BraftEditor.createEditorState(null), // 创建一个空的editorState作为初始值
      powerInner: '', // 富文本内容
      isDisable: false,
    };
  }

  // 富文本提交
  handlePowerTextSubmit = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    // const htmlContent = this.state.editorState.toHTML()
    const eleInnerText = document.querySelector('#displayArea').innerText;
    this.setState({
      visible: false, // drawer关闭
      powerInner: eleInnerText, // 保存富文本的内容
      isDisable: false
    })
    if(eleInnerText) {
      this.setState({
        isDisable: true
      })
    }
  };

  handleEditorChange = (editorState) => { this.setState({ editorState }) };

  // drawer 关闭
  handleDrawerClose = () => { this.setState({ visible: false }) };

  // 选择按钮更改
  handleRadioChange = (e) => { this.setState({ selected: e.target.value }) };

  // 图片添加
  pic_onChange = ({ fileList: newFileList }) => { this.setState({ fileList: newFileList }) };

  // 图片预览
  onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
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
  handleOnBoxClick = () => {
    this.setState({
      visible: true,
      editorState: BraftEditor.createEditorState(document.querySelector('#displayArea').innerHTML),
    })
  };

  // 表单提交
  handleFormSubmit = (v) => {
    const { fileList, editorState } = this.state;
    console.log(editorState.toHTML())
    v.file = v.file.concat(fileList);
    if(!v.noticeContent) {
      v.noticeContent = editorState.toHTML();
    }
    console.log(v)
  };

  render() {
    const {
      handleFormSubmit, pic_onChange, onPreview, handleDrawerClose, 
      handleRadioChange, handleEditorChange, handlePowerTextSubmit, 
      handleOnBoxClick
    } = this;
    const { fileList, selected, editorState, visible, powerInner, isDisable } = this.state;
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
            }}
            onValuesChange={(_, values) => {
              console.log(_);
              if(_.annoType) {
                this.setState({
                  selected: _.annoType
                })
              }
            }}
            onFinish={async (value) => { handleFormSubmit(value) }}
          >
            <ProFormText
              width="lg"
              label="标题"
              name="noticeTitle"
              laceholder="请填写公告标题"
              rules={[{ required: true, message: '请填写公告标题!' }]}
            />
            <ProForm.Group style={{marginBottom: 10}}>
              <Radio.Group onChange={handleRadioChange} value={selected}>
                <Radio disabled={isDisable} value="simpleText">普通内容块</Radio>
                <Radio value="powerText">富文本编辑器</Radio>
              </Radio.Group>
            </ProForm.Group>
            { selected === 'simpleText' 
              ? <ProFormTextArea
                  name="noticeContent"
                  width="lg"
                  placeholder="请填写公告内容"
                /> 
              : null }
            { selected === 'powerText' ? 
              <>
                {/* <TextArea style={{width: '300px'}} onFocus={handleOnBoxClick} value={powerInner} /> */}
                <div
                  id='displayArea'
                  className='braft-output-content'
                  style={displayBox}
                  onClick={handleOnBoxClick}
                  dangerouslySetInnerHTML={{__html: editorState.toHTML()}}>
                </div>
                <Drawer
                    title="富文本编辑器"
                    placement="right"
                    closable={false}
                    onClose={handleDrawerClose}
                    width="600"
                    visible={visible}
                    footer={
                      <div style={{ textAlign: 'right'}}>
                        <Button onClick={handleDrawerClose} style={{ marginRight: 8 }}>取消</Button>
                        <Button onClick={handlePowerTextSubmit} type="primary">提交</Button>
                      </div>
                    }
                  >
                    <Form layout="vertical" hideRequiredMark>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item name="dw">
                            <div className='my-component'>
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
              : null }
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
            <ProFormRadio.Group
              name="badgeSelect"
              label="公告徽标选择"
              radioType="button"
              options={badgeOption}
            />
            <ProFormDateTimeRangePicker
              width="lg"
              name="dateTimeRange"
              label="日期时间区间"
            />
            <ProFormUploadDragger max={10} width="lg" label="文件/图片" name="file" />
            <Divider dashed/>
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
            <Divider dashed/>
          </ProForm>
        </div>
      </PageContainer>
    );
  }
}

export default Announcement;