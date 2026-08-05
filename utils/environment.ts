import testData from '../data/test-data.json';

export const BASE_URL = testData.baseUrl;
export const USERNAME = testData.username;
export const PASSWORD = Buffer.from(testData.password, 'base64').toString('utf-8');