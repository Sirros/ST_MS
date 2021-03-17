export default {
  'POST /api/postFakeData': (req, res) => {
    res.send({
      status: 200,
      // currentAuthority: 'user',
      text: '公告发布成功！',
    });
  },
};
