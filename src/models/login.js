import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, sendCodeTo, reset } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    selectedUser: 'baller',
    resetStatus: -1,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log(response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            setTimeout(() => {
              window.location.href = '/';
            }, 500);
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },
    *selectedUser({ payload }, { put }) {
      yield put({
        type: 'changeSelectedUser',
        payload,
      });
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
    *sendCode({ payload }, { put, call }) {
      yield call(sendCodeTo, payload);
    },
    *resetPsw({ payload }, { put, call }) {
      const response = yield call(reset, payload);
      yield put({
        type: 'saveResetStatus',
        payload: response,
      });
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
    changeSelectedUser(state, { payload }) {
      return { ...state, selectedUser: payload };
    },
    saveResetStatus(state, { payload }) {
      return { ...state, resetStatus: payload.status };
    },
  },
};
export default Model;
