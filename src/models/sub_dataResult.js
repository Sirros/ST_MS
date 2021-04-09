import { postMatchTotalInfo, getPlayers } from '@/services/sub_dataResult';

const sub_DataResultModel = {
  namespace: 'sub_dataResult',
  state: {
    list: [],
  },
  effects: {
    *getData({ payload }, { put, call }) {
      const response = yield call(getPlayers);
      yield put({
        type: 'saveData',
        payload: response,
      });
    },
    *postData({ payload }, { put, call }) {
      const response = yield call(postMatchTotalInfo, payload);
      yield put({
        type: 'saveStatus',
        payload: response,
      });
    },
  },
  reducers: {
    saveStatus(state, { payload }) {
      const { status } = payload;
      return {
        ...state,
        status: status,
      };
    },
    saveData(state, { payload }) {
      state.list = [...payload.total.managers, ...payload.total.players];
      return {
        ...state,
      };
    },
  },
};

export default sub_DataResultModel;
