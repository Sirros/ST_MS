export default {
  'POST /api/updateTeamInfo': (req, res) => {
    res.send({
      status: 200,
      // currentAuthority: 'user',
      text: '队伍信息更新成功！',
    });
  },
  'GET /api/getTeamInfo': {
    departmentInfo: {
      teamAttr: '篮球队',
      department: '软件学院',
      HeadofDep: [{ value: '王鹏' }],
    },
    groupChat: '121970263',
    teamMembers: [
      { value: '林子博' },
      { value: '张南南' },
      { value: '李志成' },
      { value: '刘雨欣' },
      { value: '吴青云' },
      { value: '田鸿榕' },
    ],
    rules: ['行为准则1', '行为准则2'],
  },
};
