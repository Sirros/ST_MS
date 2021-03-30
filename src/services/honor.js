import request from '@/utils/request';

export async function getHonorList() {
  return request('/api/getHonorList', {
    method: 'GET',
  });
}

export async function updateHonorItem(params) {
  return request('/api/updateHonorItem', {
    method: 'POST',
    data: params,
  });
}

export async function createHonorItem(params) {
  return request('/api/createHonorItem', {
    method: 'POST',
    data: params,
  });
}
