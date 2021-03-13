import request from '@/utils/request';

export async function getFakeRosterData() {
  return request(`/api/getRosterData`);
}
