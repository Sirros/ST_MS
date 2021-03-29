export default {
  'GET /api/getFileList': {
    data: [
      {
        title: '2018年照片',
        picList: [
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201505%2F15%2F20150515142937_8iYc2.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619602825&t=abf56f24e3decf586b92d10c7423e1ee',
          'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3145875884,809295143&fm=26&gp=0.jpg',
        ],
        creator: '林子博',
        createTime: 1241343133,
      },
      {
        title: '2020年照片',
        picList: [
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.goupu.com.cn%2Ffile%2Fupload%2F201807%2F04%2F1042311889.jpg&refer=http%3A%2F%2Fwww.goupu.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619602865&t=ec00f2ea44e519106eec60f34cbf87ef',
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.58cdn.com.cn%2Fzhuanzh%2Fn_v2ad9f960bb6834dc0b5e4863130540667.jpg%3Fw%3D750%26h%3D0&refer=http%3A%2F%2Fpic2.58cdn.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619602865&t=48426ff6e54dd29a59b3093a41806431',
        ],
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
