import { postMatchTotalInfo } from '@/services/sub_dataResult';

const sub_DataResultModel = {
  namespace: 'sub_dataResult',
  state: {
    // data: {},
  },
  effects: {
    // 获取 home 页所有基本信息
    *postData({ payload }, { put, call }) {
      console.log(payload);
      const response = yield call(postMatchTotalInfo, payload);
      console.log(response);
      yield put({
        type: 'saveStatus',
        payload: response,
      });
    },
  },
  reducers: {
    saveStatus(state, { payload }) {
      const { status } = payload;
      console.log(status);
      return {
        ...state,
        status: status,
      };
    },
  },
};

export default sub_DataResultModel;
