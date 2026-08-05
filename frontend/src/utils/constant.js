const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const BASE_URL = import.meta.env.VITE_BACKEND_URL || (isLocalhost ? "http://localhost:8000/api/v1" : "/api/v1");

export const USER_API_END_POINT = `${BASE_URL}/user`;
export const JOB_API_END_POINT = `${BASE_URL}/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/company`;
export const AI_API_END_POINT = `${BASE_URL}/ai`;