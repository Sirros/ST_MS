import request from '@/utils/request';

export async function postMatchTotalInfo(params) {
  return request('/api/postMatchTotalInfo', {
    method: 'POST',
    data: params,
  });
}

export async function getPlayers() {
  return request('/api/getRosterData', {
    method: 'GET',
  });
}
