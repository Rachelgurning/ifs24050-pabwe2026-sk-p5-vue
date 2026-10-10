import { apiFetch } from '../../../helpers/apiHelper';

export const getAucationsApi = (params = {}) => {
  const q = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      q.set(key, String(value));
    }
  });

  const query = q.toString();
  const url = query ? `/aucations?${query}` : '/aucations';

  return apiFetch(url);
};

export const getAucationDetailApi = (id) =>
  apiFetch(`/aucations/${id}`);

export const createAucationApi = (data) =>
  apiFetch('/aucations', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateAucationApi = (id, data) =>
  apiFetch(`/aucations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const uploadCoverApi = (id, file) => {
  const form = new FormData();
  form.append('cover', file);

  return apiFetch(`/aucations/${id}/cover`, {
    method: 'POST',
    body: form,
  });
};

export const deleteAucationApi = (id) =>
  apiFetch(`/aucations/${id}`, {
    method: 'DELETE',
  });

export const addBidApi = (id, bid) =>
  apiFetch(`/aucations/${id}/bids`, {
    method: 'POST',
    body: JSON.stringify({ bid: Number(bid) }),
  });

export const deleteBidApi = (id) =>
  apiFetch(`/aucations/${id}/bids`, {
    method: 'DELETE',
  });

export const deleteAllAucationsApi = () =>
  apiFetch('/aucations', {
    method: 'DELETE',
  });
