import React, { Component } from 'react';
import {
  Badge, Upload, Divider, Radio,
  Drawer, Form, Row,  Col, Input,
  Select, DatePicker, Button
} from 'antd';
import ProForm, {
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormSelect,
  ProFormDateTimeRangePicker,
  ProFormUploadDragger,
  // ProFormUploadButton,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ImgCrop from 'antd-img-crop';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {
  formWrapper, tipsText,
} from './styleComponent';

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

const badgeOption = colors.map(c => {
  return {
    label: <Badge color={c} text={c} />,
    value: c,
  }
});

// Form.create()
class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      selected: 'simpleText',
      editorState: BraftEditor.createEditorState(null), // 创建一个空的editorState作为初始值
    };
  }

  async componentDidMount () {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    const htmlContent = (<div>123</div>)
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    this.setState({
        editorState: BraftEditor.createEditorState(htmlContent)
    })
  }

  submitContent = async () => {
      // 在编辑器获得焦点时按下ctrl+s会执行此方法
      // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
      const htmlContent = this.state.editorState.toHTML()
      const result = await saveEditorContent(htmlContent)
      console.log(result)
  }

  handleEditorChange = (editorState) => {
      this.setState({ editorState })
  }

  renderDrawer = () => {
   
  }

  // 可编辑文件添加
  pic_onChange = ({ fileList: newFileList }) => {
    this.setState({
      fileList: newFileList
    })
  }

  rai_onChange = (e) => {
    this.setState({
      selected: e.target.value
    })
  }

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

  onClose = () => {
    this.setState({
      selected: 'simpleText'
    })
  };

  formMain = (v) => {
    v.file = v.file.concat(this.state.fileList)
    console.log(v)
  }

  render() {
    const { formMain, pic_onChange, onPreview, onClose, rai_onChange, handleEditorChange, submitContent } = this;
    const { fileList, selected, editorState } = this.state;
    return (
      <PageContainer>
        <div style={formWrapper}>
          <ProForm
            title="validate_other"
            initialValues={{
              noticeTitle: '',
              noticeContent: '',
              noticeAttr: '',
              badgeSelect: '',
              file: [],
              annoType: selected
            }}
            onValuesChange={(_, values) => {
              console.log(_);
              if(_.annoType) {
                this.setState({
                  selected: _.annoType
                })
              }
            }}
            onFinish={async (value) => { formMain(value) }} // 提交func
          >
            <ProFormText
              width="lg"
              name="noticeTitle"
              label="标题"
              laceholder="请填写公告标题"
              rules={[{ required: true, message: '请填写公告标题!' }]}
            />
            <ProForm.Group>
              <Radio.Group onChange={rai_onChange} value={selected}>
                <Radio value="simpleText">普通内容块</Radio>
                <Radio value="powerText">富文本编辑器</Radio>
              </Radio.Group>
            </ProForm.Group>
            { selected === 'simpleText' 
              ? <ProFormTextArea
                  label="公告内容"
                  name="noticeContent"
                  width="lg"
                  rules={[{  required: true, message: '请填写公告标题!' }]}
                  placeholder="请填写公告内容"
                /> 
              : null }
            { selected === 'powerText'
              ? <Drawer
                  title="富文本编辑器"
                  placement="right"
                  closable={false}
                  onClose={onClose}
                  width="600"
                  visible={selected}
                  footer={
                    <div
                      style={{
                        textAlign: 'right',
                      }}
                    >
                      <Button onClick={onClose} style={{ marginRight: 8 }}>
                        取消  
                      </Button>
                      <Button onClick={submitContent} type="primary">
                        提交
                      </Button>
                    </div>
                  }
                >
                  <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="dw"
                        >
                          <BraftEditor
                            value={editorState}
                            onChange={handleEditorChange}
                            onSave={submitContent}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Drawer>
              : null }
            <ProFormSelect
              name="noticeAttr"
              label="公告属性"
              valueEnum={{
                drill: '训练',
                match: '比赛',
                daily: '日常',
              }}
              width="lg"
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
            <ProFormUploadDragger max={10} label="文件/图片" name="file" />
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
                {fileList.length < 5 && '+ Upload'}
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
