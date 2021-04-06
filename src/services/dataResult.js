import request from '@/utils/request';

export async function getResultData() {
  return request(`/api/getResultData`);
}
