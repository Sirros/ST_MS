export default {
  'GET /api/getHonorList': {
    honorList: {
      anta: [
        { key: 1, text: '2020 a', dateTime: 1617083688181 },
        { key: 2, text: '2019 a', dateTime: 1617083688181 },
        { key: 3, text: '2018 a', dateTime: 1617083688181 },
        { key: 4, text: '2017 a', dateTime: 1617083688181 },
        { key: 5, text: '2016 a', dateTime: 1617083688181 },
        { key: 6, text: '2015 a', dateTime: 1617083688181 },
      ],
      freshman: [
        { key: 1, text: '2020 f', dateTime: 1617083688181 },
        { key: 2, text: '2019 f', dateTime: 1617083688181 },
        { key: 3, text: '2018 f', dateTime: 1617083688181 },
        { key: 4, text: '2017 f', dateTime: 1617083688181 },
        { key: 5, text: '2016 f', dateTime: 1617083688181 },
        { key: 6, text: '2015 f', dateTime: 1617083688181 },
      ],
    },
  },
  'POST /api/updateHonorItem': (req, res) => {
    res.send({
      status: 200,
      text: '更新成功～',
    });
  },
  'POST /api/createHonorItem': (req, res) => {
    res.send({
      newList: {
        anta: [
          { key: 1, text: '2020 a', dateTime: 1617083688181 },
          { key: 2, text: '2019 a', dateTime: 1617083688181 },
          { key: 3, text: '2018 a', dateTime: 1617083688181 },
          { key: 4, text: '2017 a', dateTime: 1617083688181 },
          { key: 5, text: '2016 a', dateTime: 1617083688181 },
          { key: 6, text: '2015 a', dateTime: 1617083688181 },
          { key: 7, text: 'new a', dateTime: 1617083688181 },
        ],
        freshman: [
          { key: 1, text: '2020 f', dateTime: 1617083688181 },
          { key: 2, text: '2019 f', dateTime: 1617083688181 },
          { key: 3, text: '2018 f', dateTime: 1617083688181 },
          { key: 4, text: '2017 f', dateTime: 1617083688181 },
          { key: 5, text: '2016 f', dateTime: 1617083688181 },
          { key: 6, text: '2015 f', dateTime: 1617083688181 },
        ],
      },
    });
  },
};
