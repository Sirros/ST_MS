import React, { useState } from 'react';
import {
  Badge, Upload, Divider
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
import {} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ImgCrop from 'antd-img-crop';
import {
  formWrapper, tipsText
} from './styleComponent';

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

export default () => {
  const [fileList, setFileList] = useState([]);

  // 表单提交信息汇总
  const formMain = (v) => {
    v.file = v.file.concat(fileList)
    console.log(v)
  }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
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
  return (
    <PageContainer>
      <div
        style={formWrapper}
      >
        <ProForm
          title="validate_other"
          initialValues={{
            noticeTitle: '',
            noticeContent: '',
            noticeAttr: '',
            badgeSelect: '',
            file: []
          }}
          onValuesChange={(_, values) => {
            console.log(values);
          }}
          onFinish={async (value) => { formMain(value) }} // 提交func
        >
          <ProFormText
            width="lg"
            name="noticeTitle"
            label="标题"
            laceholder="请填写公告标题"
            rules={[{  required: true, message: '请填写公告标题!' }]}
          />
          <ProFormTextArea
            name="noticeContent"
            label="公告内容"
            width="lg"
            rules={[{  required: true, message: '请填写公告标题!' }]}
            placeholder="请填写公告内容"
          />
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
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </ProForm>
      </div>
    </PageContainer>
  );
};
