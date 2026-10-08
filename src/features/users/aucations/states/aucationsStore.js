import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as api from '../api/aucationApi';

export const useAucationsStore = defineStore('aucations', () => {
  const aucations = ref([]);
  const aucation = ref(null);
  const isAucation = ref(false);

  async function fetchAucations(params) {
    isAucation.value = true;
    const res = await api.getAucationsApi(params);
    if (!res.error) aucations.value = res.data.aucations;
    isAucation.value = false;
    return res;
  }

  async function fetchAucationDetail(id) {
    isAucation.value = true;
    const res = await api.getAucationDetailApi(id);
    if (!res.error) aucation.value = res.data.aucation;
    isAucation.value = false;
    return res;
  }

  async function createAucation(data) {
    return await api.createAucationApi(data);
  }

  async function updateAucation(id, data) {
    return await api.updateAucationApi(id, data);
  }

  async function uploadCover(id, formData) {
    return await api.uploadCoverApi(id, formData);
  }

  async function deleteAucation(id) {
    return await api.deleteAucationApi(id);
  }

  async function addBid(id, amount) {
    return await api.addBidApi(id, amount);
  }

  async function deleteBid(id) {
    return await api.deleteBidApi(id);
  }

  async function deleteAllAucations() {
    return await api.deleteAllAucationsApi();
  }

  return {
    aucations,
    aucation,
    isAucation,
    fetchAucations,
    fetchAucationDetail,
    createAucation,
    updateAucation,
    uploadCover,
    deleteAucation,
    addBid,
    deleteBid,
    deleteAllAucations,
  };
});