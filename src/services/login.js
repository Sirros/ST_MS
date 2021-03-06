import request from '@/utils/request';
// /api/login
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function sendCodeTo(params) {
  return request('/api/sendCode', {
    method: 'POST',
    data: params,
  });
}

export async function reset(params) {
  return request('/api/resetPassword', {
    method: 'POST',
    data: params,
  });
}
