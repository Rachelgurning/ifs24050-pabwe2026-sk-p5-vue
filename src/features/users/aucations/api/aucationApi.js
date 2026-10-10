import { apiFetch } from '../../../../helpers/apiHelper';

export async function getAucationsApi(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/aucations?${query}` : '/aucations';
  return apiFetch(endpoint);
}

export async function getAucationDetailApi(id) {
  return apiFetch(`/aucations/${id}`);
}

export async function createAucationApi(data) {
  return apiFetch('/aucations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAucationApi(id, data) {
  return apiFetch(`/aucations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function uploadCoverApi(id, formData) {
  return apiFetch(`/aucations/${id}/cover`, {
    method: 'POST',
    body: formData,
  });
}

export async function deleteAucationApi(id) {
  return apiFetch(`/aucations/${id}`, { method: 'DELETE' });
}

export async function addBidApi(id, amount) {
  return apiFetch(`/aucations/${id}/bids`, {
    method: 'POST',
    body: JSON.stringify({ bid_price: amount }),
  });
}

export async function deleteBidApi(id) {
  return apiFetch(`/aucations/${id}/bids`, { method: 'DELETE' });
}

export async function deleteAllAucationsApi() {
  return apiFetch('/aucations', { method: 'DELETE' });
}