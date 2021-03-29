import { getFileList, postNewFile } from '@/services/moment';

const PersonalSettingModule = {
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
      console.log(response);
      yield put({
        type: 'saveAddFile',
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
      state.addStatus = payload.status;
      return {
        ...state,
      };
    },
  },
};

export default PersonalSettingModule;
