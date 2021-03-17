import { postFakeData } from '@/services/announcement';

const AnnouncementModel = {
  namespace: 'announcement',
  state: {
    // data: {},
  },
  effects: {
    // 获取 home 页所有基本信息
    *postAnnouncementData({ payload }, { put, call }) {
      const response = yield call(postFakeData, payload);
      yield put({
        type: 'savePostState',
        payload: response,
      });
    },
  },
  reducers: {
    savePostState(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default AnnouncementModel;
