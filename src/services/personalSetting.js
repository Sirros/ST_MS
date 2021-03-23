import request from '@/utils/request';

export async function getUserInfo() {
  return request('/api/getUserInfo', {
    method: 'GET',
  });
}

export async function updateUsernfo(params) {
  return request('/api/updateUsernfo', {
    method: 'POST',
    data: params,
  });
}
