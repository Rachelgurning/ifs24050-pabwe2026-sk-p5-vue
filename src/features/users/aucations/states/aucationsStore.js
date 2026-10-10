import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as api from '../api/aucationApi';

const createAucation = (data) => api.createAucationApi(data);
const updateAucation = (id, data) => api.updateAucationApi(id, data);
const uploadCover = (id, formData) => api.uploadCoverApi(id, formData);
const deleteAucation = (id) => api.deleteAucationApi(id);
const addBid = (id, amount) => api.addBidApi(id, amount);
const deleteBid = (id) => api.deleteBidApi(id);
const deleteAllAucations = () => api.deleteAllAucationsApi();

export const useAucationsStore = defineStore('aucations', () => {
  const aucations = ref([]);
  const aucation = ref(null);
  const isAucation = ref(false);

  async function fetchAucations(params) {
    isAucation.value = true;
    const res = await api.getAucationsApi(params);
    if (!res.error) {
      aucations.value = res.data.aucations;
    }
    isAucation.value = false;
    return res;
  }

  async function fetchAucationDetail(id) {
    isAucation.value = true;
    const res = await api.getAucationDetailApi(id);
    if (!res.error) {
      aucation.value = res.data.aucation;
    }
    isAucation.value = false;
    return res;
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