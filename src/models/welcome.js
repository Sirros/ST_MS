import { getFakeWelcomeData } from '@/services/welcomeData';

const WelcomeModel = {
  namespace: 'welcome',
  state: {
    mainInfo: {},
  },
  effects: {
    // 获取 home 页所有基本信息
    *getMainInfo({ payload }, { put, call }) {
      const response = yield call(getFakeWelcomeData);
      yield put({
        type: 'saveMainInfo',
        payload: response,
      });
    },
  },
  reducers: {
    saveMainInfo(state, { payload }) {
      return {
        ...state,
        mainInfo: { ...payload },
      };
    },
  },
};

export default WelcomeModel;
