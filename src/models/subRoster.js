import { getTotalRosterData, deleteUser, addUser } from '@/services/subRoster';

const subRosterModel = {
  namespace: 'subRoster',
  state: {
    members: [],
    retList: [],
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
    *updateUser({ payload }, { put }) {
      console.log(payload);
    },
    *deleteUser({ payload }, { put, call }) {
      const response = yield call(deleteUser, payload);
      console.log(response);
      yield put({
        type: 'updateMembers',
        payload: { ...response, target: payload },
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
    saveSearch(state, { payload }) {
      if (!payload.length) {
        console.log('asdasdasdasd');
        state.retList = state.members;
      } else {
        console.log('haha');
        state.retList = state.members.filter((item) => {
          return item.studentId === payload || item.name === payload;
        });
      }
      return {
        ...state,
      };
    },
    updateMembers(state, { payload }) {
      if (payload.status === 200) {
        state.members = state.members.filter((item) => {
          return item.studentId !== payload.target;
        });
      }
      return {
        ...state,
      };
    },
    saveNewMember(state, { payload }) {
      console.log(payload);
      if (payload.status === 200) {
        console.log(payload.text);
      }
      return {
        ...state,
      };
    },
  },
};

export default subRosterModel;
