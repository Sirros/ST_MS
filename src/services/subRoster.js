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

// export async function updateTeamInfo(params) {
//   return request('/api/updateTeamInfo', {
//     method: 'POST',
//     data: params,
//   });
// }
