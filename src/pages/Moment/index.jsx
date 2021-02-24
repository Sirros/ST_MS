import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Radio, Upload, message, Input, Image, Divider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styles from './index.less';
import folderImg from '@/assets/folder.png';
import fileImg from '@/assets/file.png';
// import addFolder from '../../assets/addFolder.png';

import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

export default () => {
  const [toggleDetail, setToggleDetail] = useState(false);
  const [selectFoldetItem, setSelectFoldetItem] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createType, setCreateType] = useState('file');
  const [createFolderInfo, setCreateFolderInfo] = useState({});
  const [createFolderTitle, setCreateFolderTitle] = useState('');
  const [createFolderCreator, setCreateFolderCreator] = useState('');
  // const [currentSelectFile, setCurrentSelectFile] = useState('');

  // test data hook
  const [folderList, setFolderList] = useState(['2019年32院照片', '2018年队员训练照片']);

  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: true,
    // 这里写接口，收到上传的数据之后，服务端向数据库存储，并确认返回首页
    // 获取文件列表的接口读取数据库最新内容，做页面更新
    action: '',
    onChange(info) {
      console.log(info);
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    beforeUpload: (file) => {
      console.log(file.type);
      // 对应类型[xlsx, xls, doc, pdf, jepg, jpg, png, svg]
      const allowType = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/wps-writer',
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/svg+xml',
      ];
      // 文件格式限制
      if (allowType.findIndex((i) => i === file.type) < 0) {
        message.error(`[${file.name}] - 不支持该格式的文件上传`);
      }
      return allowType.findIndex((i) => i === file.type) > 0;
    },
    // headers: {},
    // withCredentials: false, //上传请求时是否携带 cookie
  };

  useEffect(() => {
    console.log(createFolderInfo);
    // 这里发请求更新列表
    // dispatch()
  }, [createFolderInfo]);

  const handleFolderItemClick = (e) => {
    setSelectFoldetItem(e.currentTarget.id);
    setToggleDetail(true);
    // setCurrentSelectFile(e.currentTarget.id);
  };

  const handleGoBack = () => {
    setToggleDetail(false);
  };

  const handleOpenAddCard = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (createType === 'folder') {
      setCreateFolderInfo({
        createFolderTitle,
        createFolderCreator,
        createFolderTime: Date.now(),
      });
      setFolderList([...folderList, createFolderTitle]);
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

  // 文件下载
  // const downLoad = (fileKey, fileName) => {
  //   const params = { fileKey: fileKey };
  //   const downloadUrl = contextPath + '/api/regulated/info/file/downLoad';
  //   fetch(downloadUrl, {
  //     method: 'POST',
  //     body: window.JSON.stringify(params),
  //     credentials: 'include',
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //     }),
  //   })
  //   .then((response) => {
  //     response.blob().then((blob) => {
  //       const aLink = document.createElement('a');
  //       document.body.appendChild(aLink);
  //       aLink.style.display = 'none';
  //       const objectUrl = window.URL.createObjectURL(blob);
  //       aLink.href = objectUrl;
  //       aLink.download = fileName;
  //       aLink.click();
  //       document.body.removeChild(aLink);
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // };

  function renderAddContent() {
    return (
      <div className={styles.folderContainer} onClick={(e) => handleOpenAddCard(e)}>
        <div className={styles.addFolder}>
          <p>+</p>
        </div>
      </div>
    );
  }
  // 文件夹熏染
  function renderFolderList() {
    return (
      <Row>
        {folderList.map((item) => {
          return (
            <Col span={3} key={item}>
              <div id={item} onClick={handleFolderItemClick} className={styles.folderContainer}>
                <img src={folderImg} />
                <span>
                  <b>{item}</b>
                </span>
              </div>
            </Col>
          );
        })}
        <Col span={3}>{renderAddContent()}</Col>
      </Row>
    );
  }
  // 文件渲染
  // function renderFileList() {}

  // 当前选择
  function renderPictureWall() {
    console.log(selectFoldetItem);
    return (
      <Row gutter={10} type="flex">
        <Col span={4}>
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
        </Col>
      </Row>
    );
  }

  function renderFolderDetail() {
    return (
      <div className={styles.Detail}>
        <div className={styles.DetailTitle}>
          <Button style={{ marginRight: 15 }} type="" onClick={handleGoBack}>
            返回
          </Button>
          <b>{selectFoldetItem}</b>
          <Divider dashed />
        </div>
        <div className={styles.DetailContent}>{renderPictureWall()}</div>
      </div>
    );
  }

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

  function renderModal() {
    return (
      <>
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
      </>
    );
  }

  return (
    <PageContainer className={styles.folderWrapper}>
      <Card>
        {!toggleDetail && renderFolderList()}
        {!!toggleDetail && renderFolderDetail()}
        {!!isModalVisible && renderModal()}
      </Card>
    </PageContainer>
  );
};
