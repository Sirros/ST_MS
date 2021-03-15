import { getFakeRosterData } from '@/services/roster';

const RosterModel = {
  namespace: 'roster',
  state: {
    total: {},
  },
  effects: {
    // 获取 home 页所有基本信息
    *getTotalPerson({ payload }, { put, call }) {
      const response = yield call(getFakeRosterData);
      yield put({
        type: 'saveTotal',
        payload: response,
      });
    },
  },
  reducers: {
    saveTotal(state, { payload }) {
      const { managers, players } = payload.total;
      return {
        ...state,
        total: { managers, players },
      };
    },
  },
};

export default RosterModel;
