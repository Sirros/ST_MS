import { getFileList, postNewFile, postPicture } from '@/services/moment';

const MomentModule = {
  namespace: 'moment',
  state: {
    list: [],
    addStatus: -1,
  },
  effects: {
    *getListData({ payload }, { put, call }) {
      const response = yield call(getFileList);
      yield put({
        type: 'saveListData',
        payload: response,
      });
    },
    *addFile({ payload }, { put, call }) {
      const response = yield call(postNewFile, payload);
      yield put({
        type: 'saveAddFile',
        payload: response,
      });
    },
    *uploadPicture({ payload }, { put, call }) {
      const response = yield call(postPicture, payload);
      console.log(response);
      yield put({
        type: 'updateUpload',
        payload: response,
      });
    },
  },
  reducers: {
    saveListData(state, { payload }) {
      state.list = payload.data;
      return {
        ...state,
      };
    },
    saveAddFile(state, { payload }) {
      console.log(payload);
      state.addStatus = payload.status;
      return {
        ...state,
      };
    },
    updateUpload(state, { payload }) {
      const { title } = payload;
      const idx = state.list.rows.findIndex((item) => item.title === title);
      state.list.rows.splice(idx, 1, payload);
      return {
        ...state,
      };
    },
  },
};

export default MomentModule;
