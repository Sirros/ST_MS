export const scoreColumns = [
  {
    title: '球队',
    dataIndex: 'team',
    key: 'team',
  },
  {
    title: '1ST',
    dataIndex: 'ST',
    key: 'ST',
  },
  {
    title: '2ND',
    dataIndex: 'ND',
    key: 'ND',
  },
  {
    title: '3RD',
    dataIndex: 'RD',
    key: 'RD',
  },
  {
    title: '4TH',
    dataIndex: 'TH',
    key: 'TH',
  },
];

export const personalColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '名字',
    dataIndex: 'name',
  },
  {
    title: '得分',
    dataIndex: 'score',
    sorter: (a, b) => a.score - b.score,
  },
  {
    title: '篮板',
    dataIndex: 'rebound',
    sorter: (a, b) => a.rebound - b.rebound,
  },
  {
    title: '助攻',
    dataIndex: 'assist',
    sorter: (a, b) => a.assist - b.assist,
  },
  {
    title: '投篮',
    dataIndex: 'shot',
    sorter: (a, b) => a.shot - b.shot,
  },
  {
    title: '三分',
    dataIndex: 'threepoint',
    sorter: (a, b) => a.threepoint - b.threepoint,
  },
  {
    title: '罚球',
    dataIndex: 'penalty',
    sorter: (a, b) => a.penalty - b.penalty,
  },
  {
    title: '抢断',
    dataIndex: 'steal',
    sorter: (a, b) => a.steal - b.steal,
  },
  {
    title: '盖帽',
    dataIndex: 'block',
    sorter: (a, b) => a.block - b.block,
  },
  {
    title: '失误',
    dataIndex: 'fault',
    sorter: (a, b) => a.fault - b.fault,
  },
  {
    title: '犯规',
    dataIndex: 'foul',
    sorter: (a, b) => a.foul - b.foul,
  },
  {
    title: '效率值',
    dataIndex: 'efficient',
    sorter: (a, b) => a.efficient - b.efficient,
  },
];
