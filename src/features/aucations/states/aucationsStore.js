import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as api from '../api/aucationApi';

export const useAucationsStore = defineStore('aucations', () => {
  const aucations = ref([]);
  const aucation = ref(null);
  const isAucation = ref(false);
  const isAucationAdd = ref(false);
  const isAucationAdded = ref(false);
  const isAucationChange = ref(false);
  const isAucationChanged = ref(false);
  const isAucationChangeCover = ref(false);
  const isAucationChangedCover = ref(false);
  const isAucationDelete = ref(false);
  const isAucationDeleted = ref(false);
  const isBidAdd = ref(false);
  const isBidAdded = ref(false);
  const isBidDelete = ref(false);
  const isBidDeleted = ref(false);
  const isAucationDeleteAll = ref(false);
  const isAucationDeletedAll = ref(false);

  async function fetchAucations(params = {}) {
    isAucation.value = true;
    try {
      const result = await api.getAucationsApi(params);
      if (result.status === 'success') {
        aucations.value = result.data?.aucations || [];
      }
      return result;
    } finally {
      isAucation.value = false;
    }
  }

  async function fetchAucationDetail(id) {
    isAucation.value = true;
    try {
      const result = await api.getAucationDetailApi(id);
      if (result.status === 'success') {
        aucation.value = result.data?.aucation || null;
      }
      return result;
    } finally {
      isAucation.value = false;
    }
  }

  async function createAucation(data) {
    isAucationAdd.value = true;
    try {
      const result = await api.createAucationApi(data);
      isAucationAdded.value = result.status === 'success';
      return result;
    } finally {
      isAucationAdd.value = false;
    }
  }

  async function updateAucation(id, data) {
    isAucationChange.value = true;
    try {
      const result = await api.updateAucationApi(id, data);
      isAucationChanged.value = result.status === 'success';
      return result;
    } finally {
      isAucationChange.value = false;
    }
  }

  async function uploadCover(id, file) {
    isAucationChangeCover.value = true;
    try {
      const result = await api.uploadCoverApi(id, file);
      isAucationChangedCover.value = result.status === 'success';
      return result;
    } finally {
      isAucationChangeCover.value = false;
    }
  }

  async function deleteAucation(id) {
    isAucationDelete.value = true;
    try {
      const result = await api.deleteAucationApi(id);
      isAucationDeleted.value = result.status === 'success';
      return result;
    } finally {
      isAucationDelete.value = false;
    }
  }

  async function addBid(id, bid) {
    isBidAdd.value = true;
    try {
      const result = await api.addBidApi(id, bid);
      isBidAdded.value = result.status === 'success';
      return result;
    } finally {
      isBidAdd.value = false;
    }
  }

  async function deleteBid(id) {
    isBidDelete.value = true;
    try {
      const result = await api.deleteBidApi(id);
      isBidDeleted.value = result.status === 'success';
      return result;
    } finally {
      isBidDelete.value = false;
    }
  }

  async function deleteAllAucations() {
    isAucationDeleteAll.value = true;
    try {
      const result = await api.deleteAllAucationsApi();
      isAucationDeletedAll.value = result.status === 'success';
      return result;
    } finally {
      isAucationDeleteAll.value = false;
    }
  }

  return {
    aucations, aucation, isAucation, isAucationAdd, isAucationAdded,
    isAucationChange, isAucationChanged, isAucationChangeCover,
    isAucationChangedCover, isAucationDelete, isAucationDeleted,
    isBidAdd, isBidAdded, isBidDelete, isBidDeleted, isAucationDeleteAll,
    isAucationDeletedAll, fetchAucations, fetchAucationDetail, createAucation,
    updateAucation, uploadCover, deleteAucation, addBid, deleteBid,
    deleteAllAucations,
  };
});
