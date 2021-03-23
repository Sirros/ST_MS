import { updateUsernfo, getUserInfo } from '@/services/personalSetting';

const PersonalSettingModule = {
  namespace: 'personalSetting',
  state: {
    user: {},
    result: {},
  },
  effects: {
    *getUserInfo({ payload }, { put, call }) {
      const response = yield call(getUserInfo);
      yield put({
        type: 'saveUserInfo',
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
    saveUserInfo(state, { payload }) {
      state.user = { ...payload };
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

export default PersonalSettingModule;
