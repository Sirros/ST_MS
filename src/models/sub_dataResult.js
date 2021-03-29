import { postMatchTotalInfo, getPlayers } from '@/services/sub_dataResult';

const sub_DataResultModel = {
  namespace: 'sub_dataResult',
  state: {
    list: [],
  },
  effects: {
    *getData({ payload }, { put, call }) {
      const response = yield call(getPlayers);
      console.log(response);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
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
    saveData(state, { payload }) {
      state.list = payload.list;
      return {
        ...state,
      };
    },
  },
};

export default sub_DataResultModel;
