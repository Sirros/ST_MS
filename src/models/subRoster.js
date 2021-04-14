import { getTotalRosterData, deleteUser, addUser, updateUser } from '@/services/subRoster';

const subRosterModel = {
  namespace: 'subRoster',
  state: {
    members: [],
    retList: [],
    operaStatus: { status: -1, text: '' },
  },
  effects: {
    // 获取 home 页所有基本信息
    *getTotalPerson({ payload }, { put, call }) {
      const response = yield call(getTotalRosterData);
      yield put({
        type: 'saveTotal',
        payload: response,
      });
    },
    *searchPlayer({ payload }, { put }) {
      yield put({
        type: 'saveSearch',
        payload: payload,
      });
    },
    *updateUser({ payload }, { put, call }) {
      const response = yield call(updateUser, payload);
      yield put({
        type: 'saveOperaStatus',
        payload: response,
      });
    },
    *deleteUser({ payload }, { put, call }) {
      const response = yield call(deleteUser, payload);
      yield put({
        type: 'updateMembers',
        payload: response,
      });
    },
    *addMember({ payload }, { put, call }) {
      const response = yield call(addUser, payload);
      yield put({
        type: 'saveNewMember',
        payload: response,
      });
    },
  },
  reducers: {
    saveTotal(state, { payload }) {
      state.members = payload.total;
      return {
        ...state,
      };
    },
    saveOperaStatus(state, { payload }) {
      state.members = payload.newTotal;
      state.operaStatus = { status: payload.status, text: payload.text };
      return {
        ...state,
      };
    },
    saveSearch(state, { payload }) {
      if (!payload.length) {
        state.retList = state.members;
      } else {
        state.retList = state.members.filter((item) => {
          return item.studentId === payload || item.name === payload;
        });
      }
      return {
        ...state,
      };
    },
    updateMembers(state, { payload }) {
      state.members = payload.newList;
      state.operaStatus = { status: payload.status, text: payload.text };
      return {
        ...state,
      };
    },
    saveNewMember(state, { payload }) {
      return {
        ...state,
      };
    },
  },
};

export default subRosterModel;
