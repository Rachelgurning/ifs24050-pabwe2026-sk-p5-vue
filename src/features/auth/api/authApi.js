import { apiFetch } from '../../../helpers/apiHelper';

export function loginApi({ email, password }) {
  return apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export function registerApi({ name, email, password }) {
  return apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
}

export function logoutApi() {
  return apiFetch('/auth/logout', { method: 'POST' });
}
