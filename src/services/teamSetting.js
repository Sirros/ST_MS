import request from '@/utils/request';

export async function updateTeamInfo(params) {
  return request('/api/updateTeamInfo', {
    method: 'POST',
    data: params,
  });
}

export async function getTeamInfo() {
  return request('/api/getTeamInfo', {
    method: 'GET',
  });
}
