import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Radio, Upload, message, Input, Image, Divider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styles from './index.less';
import folderImg from '@/assets/folder.png';
import fileImg from '@/assets/file.png';
import { connect } from 'umi';

import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const Moment = ({ dispatch, fileTotal }) => {
  const [toggleDetail, setToggleDetail] = useState(false);
  const [selectFoldetItem, setSelectFoldetItem] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createType, setCreateType] = useState('file'); // 创建类型
  const [createFolderTitle, setCreateFolderTitle] = useState(''); // 新文件夹名称
  const [createFolderCreator, setCreateFolderCreator] = useState(''); // 新文件夹创建人

  const [createInfo, setCreateInfo] = useState({});

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    console.log(123);
    dispatch({
      type: 'moment/getListData',
    });
  }, []);

  useEffect(() => {
    console.log(fileTotal);
    const { list } = fileTotal;
    if (list && Object.keys(list).length) {
      setFileList(list.rows);
    }
  }, [fileTotal]);

  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: true,
    // 这里写接口，收到上传的数据之后，服务端向数据库存储，并确认返回首页
    // 获取文件列表的接口读取数据库最新内容，做页面更新
    action: '/api/postPicture',
    onChange(info) {
      console.log(info.file);
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    beforeUpload: (file) => {
      console.log(file.type);
      // 对应类型[jepg, jpg, png, svg]
      const allowType = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
      // 文件格式限制
      if (allowType.findIndex((i) => i === file.type) < 0) {
        message.error(`[${file.name}] - 不支持该格式的文件上传`);
      }
      return allowType.findIndex((i) => i === file.type) > 0;
    },
    // headers: {},
    // withCredentials: false, //上传请求时是否携带 cookie
  };

  // 文件夹点击
  const handleFolderItemClick = (e) => {
    setSelectFoldetItem(e.currentTarget.id);
    setToggleDetail(true);
  };

  // 返回
  const handleGoBack = () => {
    setToggleDetail(false);
  };

  // “添加” 点击
  const handleOpenAddCard = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (createType === 'folder') {
      const temp = {
        title: createFolderTitle,
        creator: createFolderCreator,
        createTime: Date.now(),
      };
      setCreateInfo(temp);
      dispatch({
        type: 'moment/addFile',
        payload: createInfo,
      });
      message.success('创建文件夹成功！');
    } else {
      message.success('上传文件成功！');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateTypeChange = (e) => {
    setCreateType(e.target.value);
  };

  const handleCreateTitleChange = (e) => {
    setCreateFolderTitle(e.target.value);
  };

  const handleCreatorChange = (e) => {
    setCreateFolderCreator(e.target.value);
  };

  // 文件/文件夹渲染
  function renderFolderList() {
    return (
      <Row>
        {fileList &&
          fileList.length &&
          fileList.map((item) => {
            return (
              <Col span={3} key={item.title}>
                <div
                  id={item.title}
                  onClick={handleFolderItemClick}
                  className={styles.folderContainer}
                >
                  <img src={folderImg} />
                  <span>
                    <b>{item.title}</b>
                  </span>
                </div>
              </Col>
            );
          })}
      </Row>
    );
  }

  // 当前选择
  function renderPictureWall() {
    console.log(fileList);
    const idx = fileList.findIndex((item) => item.title == selectFoldetItem);
    console.log(idx);
    return (
      <>
        <Row gutter={10} type="flex">
          <Image.PreviewGroup>
            {fileList && fileList[idx].picList ? (
              fileList[idx].picList.map((item, idx) => {
                return (
                  <Col span={4} key={idx}>
                    <Image src={item.url} />
                  </Col>
                );
              })
            ) : (
              <p>暂无内容</p>
            )}
          </Image.PreviewGroup>
        </Row>
      </>
    );
  }

  function renderFolderDetail() {
    return (
      <div className={styles.Detail}>
        <div className={styles.DetailTitle}>
          <Button style={{ marginRight: 15 }} type="primary" onClick={handleGoBack}>
            返回
          </Button>
          <b>{selectFoldetItem}</b>
          <Divider dashed />
        </div>
        <div className={styles.DetailContent}>{renderPictureWall()}</div>
      </div>
    );
  }

  // 添加图片/文件夹
  function renderUploadFile() {
    return (
      <div className={styles.uploadArea}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域进行上传</p>
          <p className="ant-upload-hint">支持单个或批量上传</p>
        </Dragger>
      </div>
    );
  }

  // 模式选择
  function renderModal(option) {
    return (
      <>
        {option === 'add' && (
          <Modal title="添加内容" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            添加类型：
            <Radio.Group value={createType} onChange={handleCreateTypeChange}>
              <Radio.Button value="file">文件</Radio.Button>
              <Radio.Button value="folder">文件夹</Radio.Button>
            </Radio.Group>
            {createType === 'file' && renderUploadFile()}
            {createType === 'folder' && (
              <>
                <Input
                  style={{ marginTop: 15 }}
                  allowClear
                  size="middle"
                  addonBefore="文件夹名称"
                  defaultValue=""
                  onChange={handleCreateTitleChange}
                />
                <Input
                  style={{ marginTop: 15 }}
                  allowClear
                  size="middle"
                  addonBefore="创建人"
                  defaultValue=""
                  onChange={handleCreatorChange}
                />
              </>
            )}
          </Modal>
        )}
      </>
    );
  }

  return (
    <PageContainer className={styles.folderWrapper}>
      <Button type="dashed" style={{ marginBottom: 10 }} onClick={(e) => handleOpenAddCard(e)}>
        添加
      </Button>
      <Card>
        {!toggleDetail && renderFolderList()}
        {!!toggleDetail && renderFolderDetail()}
        {!!isModalVisible && renderModal('add')}
      </Card>
    </PageContainer>
  );
};

export default connect(({ moment }) => ({
  fileTotal: moment,
}))(Moment);
