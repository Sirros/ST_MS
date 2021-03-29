import request from '@/utils/request';

export async function getFileList() {
  return request('/api/getFileList', {
    method: 'GET',
  });
}

export async function postNewFile(params) {
  return request('/api/postNewFile', {
    method: 'POST',
    data: params,
  });
}

export async function postPicture(params) {
  return request('/api/postPicture', {
    method: 'POST',
    data: params,
  });
}
