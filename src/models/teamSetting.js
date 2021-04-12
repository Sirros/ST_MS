import { updateTeamInfo, getTeamInfo } from '@/services/teamSetting';

const TeamSettingModule = {
  namespace: 'teamSetting',
  state: {
    Info: {},
  },
  effects: {
    *getTeamInfo({ payload }, { put, call }) {
      const response = yield call(getTeamInfo);
      yield put({
        type: 'saveTeamInfo',
        payload: response,
      });
    },
    *updateTeam({ payload }, { put, call }) {
      const response = yield call(updateTeamInfo, payload);
      yield put({
        type: 'saveUpdateState',
        payload: response,
      });
    },
  },
  reducers: {
    saveTeamInfo(state, { payload }) {
      state.Info = { ...payload };
      return {
        ...state,
      };
    },
    saveUpdateState(state, { payload }) {
      state.Info = { ...payload };
      return {
        ...state,
        // result: { ...payload },
      };
    },
  },
};

export default TeamSettingModule;
