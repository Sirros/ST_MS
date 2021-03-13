import { getFakeRosterData } from '@/services/roster';

const WelcomeModel = {
  namespace: 'roster',
  state: {
    mainInfo: {},
  },
  effects: {
    // 获取 home 页所有基本信息
    *getMainInfo({ payload }, { put, call }) {
      const response = yield call(getFakeRosterData);
      yield put({
        type: 'saveMainInfo',
        payload: response,
      });
    },
  },
  reducers: {
    saveRoster(state, { payload }) {
      return {
        ...state,
        mainInfo: { ...payload },
      };
    },
  },
};

export default WelcomeModel;
