const table_data = [];
for (let i = 0; i < 15; i++) {
  table_data.push({
    key: i + 1,
    name: `队员 ${i}`,
    score: Math.floor(Math.random() * 20),
    rebound: Math.floor(Math.random() * 10),
    assist: Math.floor(Math.random() * 10),
    shot: '10/15',
    threepoint: '3/5',
    penalty: '7/8',
    block: Math.floor(Math.random() * 3),
    steal: Math.floor(Math.random() * 3),
    fault: Math.floor(Math.random() * 5),
    foul: Math.floor(Math.random() * 4),
    //[(得分+篮板+助攻+抢断+封盖)-(出手次数-命中次数)-(罚球次数-罚球命中次数)-失误次数]/球员上场比赛的场次
    efficient: `+${Math.floor(20 + 10 + 10 + 2 + 1 - 5 - 1 - 6) / 2}`,
  });
}

export default {
  // 支持值为 Object 和 Array
  'GET /api/getResultData': {
    details: [
      {
        our_team: {
          team: '软件',
          ST: 17,
          ND: 14,
          RD: 10,
          TH: 9,
          key: '软件',
        },
        opponent_team: {
          team: '网安',
          ST: 10,
          ND: 4,
          RD: 10,
          TH: 9,
          key: '网安',
        },
        our_binData: [
          { item: '两分球', count: 40, percent: 0.7 },
          { item: '三分球', count: 21, percent: 0.21 },
          { item: '罚球', count: 9, percent: 0.09 },
        ],
        our_zhuData: [
          { name: '命中', type: '运动战', num: 12 },
          { name: '命中', type: '两分球', num: 10 },
          { name: '命中', type: '三分球', num: 4 },
          { name: '命中', type: '罚球', num: 11 },
          { name: '未命中', type: '运动战', num: 10 },
          { name: '未命中', type: '两分球', num: 13 },
          { name: '未命中', type: '三分球', num: 8 },
          { name: '未命中', type: '罚球', num: 3 },
        ],
        zhexian_Data: [
          {
            section: '1ST',
            team: 'team_1',
            temperature: 17,
          },
          {
            section: '1ST',
            team: 'team_2',
            temperature: 10,
          },
          {
            section: '2ND',
            team: 'team_1',
            temperature: 14,
          },
          {
            section: '2ND',
            team: 'team_2',
            temperature: 4,
          },
          {
            section: '3RD',
            team: 'team_1',
            temperature: 10,
          },
          {
            section: '3RD',
            team: 'team_2',
            temperature: 10,
          },
          {
            section: '4TH',
            team: 'team_1',
            temperature: 9,
          },
          {
            section: '4TH',
            team: 'team_2',
            temperature: 9,
          },
          {
            section: 'Total',
            team: 'team_1',
            temperature: 50,
          },
          {
            section: 'Total',
            team: 'team_2',
            temperature: 33,
          },
        ],
        our_players_detail: table_data,
      },
      {
        our_team: {
          team: '软件',
          ST: 17,
          ND: 14,
          RD: 10,
          TH: 19,
          key: '软件',
        },
        opponent_team: {
          team: '水利',
          ST: 18,
          ND: 14,
          RD: 8,
          TH: 9,
          key: '水利',
        },
        our_binData: [
          { item: '两分球', count: 40, percent: 0.7 },
          { item: '三分球', count: 21, percent: 0.21 },
          { item: '罚球', count: 9, percent: 0.09 },
        ],
        our_zhuData: [
          { name: '命中', type: '运动战', num: 12 },
          { name: '命中', type: '两分球', num: 10 },
          { name: '命中', type: '三分球', num: 4 },
          { name: '命中', type: '罚球', num: 11 },
          { name: '未命中', type: '运动战', num: 4 },
          { name: '未命中', type: '两分球', num: 13 },
          { name: '未命中', type: '三分球', num: 8 },
          { name: '未命中', type: '罚球', num: 2 },
        ],
        zhexian_Data: [
          {
            section: '1ST',
            team: 'team_1',
            temperature: 17,
          },
          {
            section: '1ST',
            team: 'team_2',
            temperature: 18,
          },
          {
            section: '2ND',
            team: 'team_1',
            temperature: 14,
          },
          {
            section: '2ND',
            team: 'team_2',
            temperature: 14,
          },
          {
            section: '3RD',
            team: 'team_1',
            temperature: 10,
          },
          {
            section: '3RD',
            team: 'team_2',
            temperature: 8,
          },
          {
            section: '4TH',
            team: 'team_1',
            temperature: 19,
          },
          {
            section: '4TH',
            team: 'team_2',
            temperature: 9,
          },
          {
            section: 'Total',
            team: 'team_1',
            temperature: 60,
          },
          {
            section: 'Total',
            team: 'team_2',
            temperature: 49,
          },
        ],
        our_players_detail: table_data,
      },
    ],
  },
};
