export default {
  // 支持值为 Object 和 Array
  'GET /api/getSechduleData': {
    mon: [3, 4],
    details: {
      3: {
        eventsDay: [11, 14, 16, 19, 21],
        dayDetail: {
          11: [{ type: 'warning', content: '球队日常训练' }],
          14: [{ type: 'warning', content: '球队日常训练' }],
          16: [{ type: 'warning', content: '球队日常训练' }],
          19: [
            { type: 'success', content: '球队日常训练' },
            { type: 'error', content: '与计算机友谊赛' },
          ],
          21: [{ type: 'warning', content: '球队日常训练' }],
        },
      },
      4: {
        eventsDay: [10, 12],
        dayDetail: {
          10: [{ type: 'warning', content: '球队日常训练' }],
          12: [{ type: 'warning', content: '球队日常训练' }],
        },
      },
    },
  },
};
