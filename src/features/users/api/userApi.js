import { apiFetch } from '../../../helpers/apiHelper';
export const getUsersApi = () => apiFetch('/users');
export const getProfileApi = () => apiFetch('/users/me');
export const updateProfileApi = (data) => apiFetch('/users/me', { method:'PUT', body:JSON.stringify(data) });
export const uploadAvatarApi = (file) => { const form=new FormData(); form.append('photo', file); return apiFetch('/users/me/photo',{method:'POST',body:form}); };
export const updatePasswordApi = (data) => apiFetch('/users/password', { method:'PUT', body:JSON.stringify(data) });
