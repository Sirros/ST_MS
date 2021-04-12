export default {
  'GET /api/getFileList': {
    data: [
      {
        title: '2018年照片',
        picList: [{ url: '/images/defa.jpeg', id: 1 }],
        creator: '林子博',
        createTime: 1241343133,
      },
      {
        title: '2020年照片',
        picList: [{ url: '/images/defa.jpeg', id: 1 }],
        creator: '林子博',
        createTime: 1413123123,
      },
    ],
  },
  'POST /api/postNewFile': (req, res) => {
    res.send({
      status: 2001,
      text: '文件夹创建成功',
    });
  },
  'POST /api/postPicture': (req, res) => {
    console.log(res);
    res.send({
      status: 2002,
      text: '图片上传成功',
    });
  },
};
