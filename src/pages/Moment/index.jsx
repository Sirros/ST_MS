import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Radio, Upload, message, Input, Image, Divider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styles from './index.less';
import folderImg from '@/assets/folder.png';
import { connect } from 'umi';

import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const Moment = ({ dispatch, fileTotal }) => {
  const [toggleDetail, setToggleDetail] = useState(false);
  const [selectFoldetItem, setSelectFoldetItem] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [createType, setCreateType] = useState('file'); // 创建类型
  const [createFolderTitle, setCreateFolderTitle] = useState(''); // 新文件夹名称
  const [createFolderCreator, setCreateFolderCreator] = useState(''); // 新文件夹创建人

  const [createInfo, setCreateInfo] = useState({});
  const [fileList, setFileList] = useState([]);
  const [pictureList, setPictureList] = useState([]);
  const [level, setLevel] = useState(1);
  // const [targetFolder, setTargetFolder] = useState({});

  useEffect(() => {
    dispatch({
      type: 'moment/getListData',
    });
  }, []);

  useEffect(() => {
    const { list } = fileTotal;
    if (list && Object.keys(list).length) {
      setFileList(list.rows);
    }
  }, [fileTotal]);

  useEffect(() => {
    if (Object.keys(createInfo).length) {
      dispatch({
        type: 'moment/addFile',
        payload: createInfo,
      });
    }
  }, [createInfo]);

  const { Dragger } = Upload;

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const props = {
    name: 'file',
    multiple: true,
    // action: '/api/postPicture',
    onChange(info) {
      const { status, name, uid } = info.file;
      if (status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl) => {
          setPictureList([...pictureList, { b64: imageUrl, name, uid }]);
        });
        message.success(`${info.file.name} 文件添加成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件添加失败.`);
      }
    },
    beforeUpload: (file) => {
      // 对应类型[jepg, jpg, png, svg]
      const allowType = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
      // 文件格式限制
      if (allowType.findIndex((i) => i === file.type) < 0) {
        message.error(`[${file.name}] - 不支持该格式的文件上传`);
      }
      return allowType.includes(file.type);
    },
    // headers: {},
    // withCredentials: false, //上传请求时是否携带 cookie
  };

  // 文件夹点击
  const handleFolderItemClick = (e) => {
    setLevel(level + 1);
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
    setConfirmLoading(true);
    if (createType === 'folder') {
      const temp = {
        title: createFolderTitle,
        creator: createFolderCreator,
        createTime: Date.now(),
      };
      setFileList([...fileList, temp]);
      setCreateInfo(temp);
      message.success('创建文件夹成功！');
    } else {
      dispatch({
        type: 'moment/uploadPicture',
        payload: {
          picture_list: pictureList,
          target_folder: selectFoldetItem,
        },
      });
    }
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
      setPictureList([]);
    }, 2000);
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
        {fileList && fileList.length
          ? fileList.map((item) => {
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
            })
          : '暂无内容'}
      </Row>
    );
  }

  // 当前选择
  function renderPictureWall() {
    const idx = fileList.findIndex((item) => item.title == selectFoldetItem);
    return (
      <>
        <Row gutter={10} type="flex">
          <Image.PreviewGroup>
            {fileList && fileList[idx].picList ? (
              fileList[idx].picList.map((item) => {
                return (
                  <Col span={4} key={item.id}>
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
          <Modal
            title="添加内容"
            confirmLoading={confirmLoading}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            添加类型：
            <Radio.Group value={createType} onChange={handleCreateTypeChange}>
              <Radio.Button value="file">文件</Radio.Button>
              {level < 2 && <Radio.Button value="folder">文件夹</Radio.Button>}
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
        添加文件夹
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
