<script setup>
import { useStore } from "vuex";
import AlertComponent from "./components/AlertComponent.vue";
import { ref, onMounted } from "vue";
const store = useStore();
// console.log(store.status.alertStatus.status);
console.log(store.state);
const alertStatus = ref(store.state.alertStatus.status);
onMounted(() => {
  console.log(alertStatus.value);
});
</script>

<template>
  <div
    id="app"
    class="h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"
  >
    <AlertComponent v-show="alertStatus" />
    <router-view></router-view>
  </div>
</template>

<!-- <script>

import AlertComponent from './components/AlertComponent.vue';
export default {
    name: "App",
    components: { AlertComponent }
};
</script> -->
