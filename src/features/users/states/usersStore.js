import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as api from '../api/userApi';

export const useUsersStore = defineStore('users', () => {
  const users = ref([]);
  const user = ref(null);
  const profile = ref(null);
  const isLoading = ref(false);
  const isUpdating = ref(false);
  const isUploadingPhoto = ref(false);
  const isChangingPassword = ref(false);

  async function fetchUsers() {
    isLoading.value = true;
    try {
      const result = await api.getUsersApi();
      if (result.status === 'success') {
        users.value = result.data?.users || [];
      }
      return result;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchProfile() {
    isLoading.value = true;
    try {
      const result = await api.getProfileApi();
      if (result.status === 'success') {
        profile.value = result.data?.user || null;
        user.value = profile.value;
      }
      return result;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateProfile(data) {
    isUpdating.value = true;
    try {
      const result = await api.updateProfileApi(data);
      if (result.status === 'success') {
        await fetchProfile();
      }
      return result;
    } finally {
      isUpdating.value = false;
    }
  }

  async function uploadPhoto(file) {
    isUploadingPhoto.value = true;
    try {
      const result = await api.uploadAvatarApi(file);
      if (result.status === 'success') {
        await fetchProfile();
      }
      return result;
    } finally {
      isUploadingPhoto.value = false;
    }
  }

  async function changePassword(data) {
    isChangingPassword.value = true;
    try {
      return await api.updatePasswordApi(data);
    } finally {
      isChangingPassword.value = false;
    }
  }

  return {
    users, user, profile, isLoading, isUpdating, isUploadingPhoto,
    isChangingPassword, fetchUsers, fetchProfile, updateProfile,
    uploadPhoto, changePassword,
  };
});
