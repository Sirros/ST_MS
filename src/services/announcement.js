import request from '@/utils/request';

export async function postFakeData(params) {
  return request('/api/postFakeData', {
    method: 'POST',
    data: params,
  });
}
