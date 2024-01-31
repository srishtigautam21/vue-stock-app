<script setup>
import { useStore } from "vuex";
import AlertComponent from "./components/AlertComponent.vue";
import { computed } from "vue";
const store = useStore();
// console.log(store.status.alertStatus.status);
console.log("in app view", store.state.alertStatus.status);
const alertStatus = computed(() => store.state.alertStatus.status);
// let alertStatus;
// watch(alertStatus, () => {
//   alertStatus = store.state.alertStatus.status;
// });
// onMounted(() => {
//   console.log(alertStatus);
// });
</script>

<template>
  <div
    id="app"
    class="h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"
  >
    <AlertComponent v-if="alertStatus" />
    <router-view></router-view>
  </div>
</template>
