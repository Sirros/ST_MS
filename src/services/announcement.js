import request from '@/utils/request';

export async function postAnnData(params) {
  return request('/api/postAnnData', {
    method: 'POST',
    data: params,
  });
}
