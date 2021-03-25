export default {
  'GET /api/getTotalPerson': {
    total: [
      {
        key: 1,
        name: `哈哈`,
        attr: '队员',
        grade: '2017',
        age: 32,
        address: `中国香港`,
        studentId: '2017141463192',
        take_charge: 'SF/PF',
        em: '121970263@qq.com',
        phone: '13032867907',
        jersey_number: '1',
        jersey_size: 'xxxl',
        height: '182cm',
        weight: '80kg',
        remark: '暂无伤病信息暂无伤病信息暂无伤病信息暂无伤病信息',
      },
      {
        key: 2,
        name: `raj`,
        attr: '队员',
        grade: '2017',
        age: 32,
        address: `印度`,
        studentId: '2017141463199',
        take_charge: 'SF/PF',
        em: '121970263@qq.com',
        phone: '13032867907',
        jersey_number: '1',
        jersey_size: 'xxxl',
        height: '182cm',
        weight: '80kg',
        remark: '受伤',
      },
    ],
  },
  'POST /api/deleteUser': (req, res) => {
    res.send({
      status: 200,
    });
  },
  'POST /api/addUser': (req, res) => {
    res.send({
      status: 200,
      text: '添加成功',
    });
  },
};
