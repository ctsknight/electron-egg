import request from './request';

export function getImageFormatTypes() {
  return request({
    url: '/api/imageformattypes',
    method: 'get',
  });
}

export function getImageColorTypes() {
  return request({
    url: '/api/imagecolortypes',
    method: 'get',
  });
}
