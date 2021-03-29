import { getHonorList, updateHonorItem, createHonorItem } from '@/services/honor';

const HonorModule = {
  namespace: 'honor',
  state: {
    honorList: [],
  },
  effects: {
    *getList({ payload }, { put, call }) {
      const response = yield call(getHonorList);
      console.log(response);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    *updateUser({ payload }, { put, call }) {
      const response = yield call(updateUsernfo, payload);
      yield put({
        type: 'saveUpdateState',
        payload: response,
      });
    },
  },
  reducers: {
    saveList(state, { payload }) {
      state.honorList = payload.honorList;
      return {
        ...state,
      };
    },
    saveUpdateState(state, { payload }) {
      return {
        ...state,
        result: { ...payload },
      };
    },
  },
};

export default HonorModule;
