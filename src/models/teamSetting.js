import { updateTeamInfo, getTeamInfo, changeMoney } from '@/services/teamSetting';

const TeamSettingModule = {
  namespace: 'teamSetting',
  state: {
    Info: {},
    changeMoneyStatus: -1,
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
    *changeMoney({ payload }, { put, call }) {
      const response = yield call(changeMoney, payload);
      console.log(response);
      yield put({
        type: 'saveChangeState',
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
    saveChangeState(state, { payload }) {
      return { ...state, changeMoneyStatus: payload.status };
    },
  },
};

export default TeamSettingModule;
