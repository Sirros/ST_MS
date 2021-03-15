import request from '@/utils/request';

export async function getFakeResultData() {
  return request(`/api/getFakeResultData`);
}
