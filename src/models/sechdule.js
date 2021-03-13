import { getFakeSechduleData } from '@/services/sechdule';

const SechduleModel = {
  namespace: 'sechdule',
  state: {
    events: {},
  },
  effects: {
    // 获取 home 页所有基本信息
    *getDataEvents({ payload }, { put, call }) {
      const response = yield call(getFakeSechduleData);
      yield put({
        type: 'saveDateEvents',
        payload: response,
      });
    },
  },
  reducers: {
    saveDateEvents(state, { payload }) {
      return {
        ...state,
        events: { ...payload },
      };
    },
  },
};

export default SechduleModel;
