const baseUrl = 'https://oielly-admin.netlify.app';
const realUrl = 'http://127.0.0.1:1337';

export const STAFF = realUrl + '/api/entries/staff';
export const CLIENT = realUrl + '/api/entries/client';
export const GUEST = realUrl + '/api/entries/guest';
export const MAR_MATERIAL = realUrl + '/api/market/material';
export const PROD_MATERIAL = realUrl + '/api/product/material';
export const ORDER = realUrl + '/api/order';
export const STAFF_UPLOAD = realUrl + '/api/entries/staff/upload-image';
export const CLIENT_UPLOAD = realUrl + '/api/entries/client/upload-image';

 
export const CLIENT_GET_ALL = baseUrl +'/json/client-list.json';
export const CLIENT_GET_ONE = baseUrl +'/json/client-view.json';
export const GUEST_GET_ALL = baseUrl +'/json/guest-list.json';
export const GUEST_GET_ONE = baseUrl +'/json/guest-view.json';
export const MARKET_MATERIAL_GET_ALL = baseUrl + '/json/market-material-list.json'; 
export const PRODUCT_MATERIAL_GET_ALL = baseUrl + '/json/product-list.json';
export const PENDING = baseUrl + '/json/pending.json';
export const DELIVERING = baseUrl + '/json/delivering.json';

export const WALLET = baseUrl + '/json/wallet.json';
export const REVIEW = baseUrl + '/json/review.json';
export const HOMEPAGE_INTRO = baseUrl + '/json/homepage-intro.json';
export const HOMEPAGE_BANNER = baseUrl + '/json/homepage-banner.json';

export const ENTRIES = '/v1/entries';
export const MARKET = '/v1/market';
export const PRODUCT = '/v1/product';
export const STAFF_ADD = ENTRIES +'/staff/add';
export const STAFF_LIST = ENTRIES +'/staff/list';
export const CLIENT_ADD = ENTRIES + '/client/add';
export const CLIENT_LIST = ENTRIES + '/client/list';
export const GUEST_LIST = ENTRIES + '/guest/list';
export const MARKET_MATERIAL_LIST = MARKET + '/material/list';
export const MARKET_MATERIAL_ADD = MARKET + '/material/add';
export const PRODUCT_LIST = PRODUCT + '/material/list'
export const PRODUCT_ADD = PRODUCT + '/material/add'