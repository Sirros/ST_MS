import { getHonorList, updateHonorItem, createHonorItem } from '@/services/honor';

const HonorModule = {
  namespace: 'honor',
  state: {
    honorList: [],
    updateStatus: -1,
  },
  effects: {
    *getList({ payload }, { put, call }) {
      const response = yield call(getHonorList);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    *updateItem({ payload }, { put, call }) {
      const response = yield call(updateHonorItem, payload);
      yield put({
        type: 'saveUpdateState',
        payload: response,
      });
    },
    *createItem({ payload }, { put, call }) {
      const response = yield call(createHonorItem, payload);
      yield put({
        type: 'saveNewList',
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
      state.updateStatus = payload.status;
      state.honorList = payload.updatedList;
      return {
        ...state,
      };
    },
    saveNewList(state, { payload }) {
      state.honorList = payload.newList;
      return {
        ...state,
      };
    },
  },
};

export default HonorModule;
