import request from '@/utils/request';

export async function getFakeSechduleData() {
  return request(`/api/getSechduleData`);
}
