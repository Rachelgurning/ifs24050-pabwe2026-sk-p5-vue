import { defineStore } from 'pinia'; import { ref } from 'vue'; import * as api from '../api/userApi';
export const useUsersStore=defineStore('users',()=>{
 const users=ref([]), user=ref(null), profile=ref(null), isLoading=ref(false), isUpdating=ref(false), isUploadingPhoto=ref(false), isChangingPassword=ref(false);
 async function fetchUsers(){isLoading.value=true;const r=await api.getUsersApi();if(r.status==='success')users.value=r.data?.users||[];isLoading.value=false;return r;}
 async function fetchProfile(){isLoading.value=true;const r=await api.getProfileApi();if(r.status==='success'){profile.value=r.data?.user||null;user.value=profile.value;}isLoading.value=false;return r;}
 async function updateProfile(data){isUpdating.value=true;const r=await api.updateProfileApi(data);if(r.status==='success')await fetchProfile();isUpdating.value=false;return r;}
 async function uploadPhoto(file){isUploadingPhoto.value=true;const r=await api.uploadAvatarApi(file);if(r.status==='success')await fetchProfile();isUploadingPhoto.value=false;return r;}
 async function changePassword(data){isChangingPassword.value=true;const r=await api.updatePasswordApi(data);isChangingPassword.value=false;return r;}
 return {users,user,profile,isLoading,isUpdating,isUploadingPhoto,isChangingPassword,fetchUsers,fetchProfile,updateProfile,uploadPhoto,changePassword};
});
