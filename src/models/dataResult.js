import { getResultData } from '@/services/dataResult';

const DataResultModel = {
  namespace: 'dataResult',
  state: {
    data: {},
  },
  effects: {
    // 获取 home 页所有基本信息
    *getData({ payload }, { put, call }) {
      const response = yield call(getResultData);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
  },
  reducers: {
    saveData(state, { payload }) {
      const { details } = payload;
      return {
        ...state,
        totalData: details,
      };
    },
  },
};

export default DataResultModel;
