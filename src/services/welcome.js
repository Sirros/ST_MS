import request from '@/utils/request';

export async function getFakeWelcomeData() {
  return request(`/api/getWelcomeData`);
}
