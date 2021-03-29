export default {
  'POST /api/postMatchTotalInfo': (req, res) => {
    res.send({
      status: 200,
      text: '上传成功',
    });
  },
  'GET /api/getPlayers': {
    list: [
      { name: '林子博', key: '20171' },
      { name: '张南南', key: '20172' },
      { name: '李志成', key: '20173' },
      { name: '苏锐程', key: '20174' },
      { name: '江畔累', key: '20175' },
      { name: '无影卫', key: '20176' },
      { name: '皇位', key: '20177' },
      { name: '王鹏', key: '20178' },
      { name: '刘雨欣', key: '20179' },
      { name: '吴青云', key: '201710' },
      { name: '陈冠希', key: '201711' },
    ],
  },
};
