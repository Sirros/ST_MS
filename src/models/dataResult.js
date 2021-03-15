import { getFakeResultData } from '@/services/dataResult';

const DataResultModel = {
  namespace: 'dataResult',
  state: {
    data: {},
  },
  effects: {
    // 获取 home 页所有基本信息
    *getData({ payload }, { put, call }) {
      const response = yield call(getFakeResultData);
      console.log(response);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
  },
  reducers: {
    saveData(state, { payload }) {
      const { details } = payload;
      console.log(details);
      return {
        ...state,
        totalData: details,
      };
    },
  },
};

export default DataResultModel;
