import request from '@/utils/request';

export async function getTotalRosterData() {
  return request('/api/getTotalPerson', {
    method: 'GET',
  });
}

export async function deleteUser(params) {
  return request('/api/deleteUser', {
    method: 'POST',
    data: params,
  });
}

export async function addUser(params) {
  return request('/api/addUser', {
    method: 'POST',
    data: params,
  });
}

export async function updateUser(params) {
  return request('/api/updateUser', {
    method: 'POST',
    data: params,
  });
}
