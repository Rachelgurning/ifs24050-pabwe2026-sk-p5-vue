import { defineStore } from 'pinia'; import { ref } from 'vue'; import * as api from '../api/aucationApi';
export const useAucationsStore=defineStore('aucations',()=>{
 const aucations=ref([]),aucation=ref(null),isAucation=ref(false),isAucationAdd=ref(false),isAucationAdded=ref(false),isAucationChange=ref(false),isAucationChanged=ref(false),isAucationChangeCover=ref(false),isAucationChangedCover=ref(false),isAucationDelete=ref(false),isAucationDeleted=ref(false),isBidAdd=ref(false),isBidAdded=ref(false),isBidDelete=ref(false),isBidDeleted=ref(false),isAucationDeleteAll=ref(false),isAucationDeletedAll=ref(false);
 async function fetchAucations(params={}){isAucation.value=true;const r=await api.getAucationsApi(params);if(r.status==='success')aucations.value=r.data?.aucations||[];isAucation.value=false;return r}
 async function fetchAucationDetail(id){isAucation.value=true;const r=await api.getAucationDetailApi(id);if(r.status==='success')aucation.value=r.data?.aucation||null;isAucation.value=false;return r}
 async function createAucation(d){isAucationAdd.value=true;const r=await api.createAucationApi(d);isAucationAdded.value=r.status==='success';isAucationAdd.value=false;return r}
 async function updateAucation(id,d){isAucationChange.value=true;const r=await api.updateAucationApi(id,d);isAucationChanged.value=r.status==='success';isAucationChange.value=false;return r}
 async function uploadCover(id,f){isAucationChangeCover.value=true;const r=await api.uploadCoverApi(id,f);isAucationChangedCover.value=r.status==='success';isAucationChangeCover.value=false;return r}
 async function deleteAucation(id){isAucationDelete.value=true;const r=await api.deleteAucationApi(id);isAucationDeleted.value=r.status==='success';isAucationDelete.value=false;return r}
 async function addBid(id,b){isBidAdd.value=true;const r=await api.addBidApi(id,b);isBidAdded.value=r.status==='success';isBidAdd.value=false;return r}
 async function deleteBid(id){isBidDelete.value=true;const r=await api.deleteBidApi(id);isBidDeleted.value=r.status==='success';isBidDelete.value=false;return r}
 async function deleteAllAucations(){isAucationDeleteAll.value=true;const r=await api.deleteAllAucationsApi();isAucationDeletedAll.value=r.status==='success';isAucationDeleteAll.value=false;return r}
 return {aucations,aucation,isAucation,isAucationAdd,isAucationAdded,isAucationChange,isAucationChanged,isAucationChangeCover,isAucationChangedCover,isAucationDelete,isAucationDeleted,isBidAdd,isBidAdded,isBidDelete,isBidDeleted,isAucationDeleteAll,isAucationDeletedAll,fetchAucations,fetchAucationDetail,createAucation,updateAucation,uploadCover,deleteAucation,addBid,deleteBid,deleteAllAucations};
});
