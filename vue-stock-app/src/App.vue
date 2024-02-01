<script setup>
import { useStore } from "vuex";
import AlertComponent from "./components/AlertComponent.vue";
import { computed } from "vue";
const store = useStore();

const alertStatus = computed(() => store.state.alertStatus.status);
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
