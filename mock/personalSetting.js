export default {
  'POST /api/updateUsernfo': (req, res) => {
    res.send({
      status: 200,
      // currentAuthority: 'user',
      text: '个人信息更新成功！',
    });
  },
  'GET /api/getUserInfo': {
    uid: 2017141463192,
    name: 'raj',
    avatar:
      'https://img14.360buyimg.com/ling/jfs/t1/65037/16/2324/86301/5d09ce30Ea44a0a46/36baea38fd0b45ee.png',
    phoneNumber: '13032867907',
    bodyInfo: {
      height: 182,
      weight: 80,
      size: 'xxxl',
    },
    area: '四川成都',
    signature: '签名签名签名',
    tag: [],
    grade: 2015,
    email: '13032867907@163.com',
  },
};
