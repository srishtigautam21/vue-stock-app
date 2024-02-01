<script setup>
import { useStore } from "vuex";
const store = useStore();
const { state } = store;

const alertMessage = state.alertStatus.message;

const handleCrossBtn = () => {
  store.commit("SET_ALERT_STATUS", { status: false, message: "" });
  store.commit("SET_SEARCH_INPUT", "");
};
</script>

<template>
  <div class="alert-component">
    <div class="alert-box">
      <span class="icon">&#9888;</span>
      <span class="message">{{ alertMessage }}</span>
      <span class="cross" @click="handleCrossBtn">X</span>
    </div>
  </div>
</template>

<style scoped>
.alert-component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(212, 210, 210);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  z-index: 10;
  padding-top: 100px;
}
.alert-box {
  width: 40%;
  z-index: 1000;
  height: fit-content;
  padding: 50px 30px;
  font-size: 20px;
  font-weight: 600;
  border: 2px solid grey;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.message {
  text-align: center;
}
.icon {
  font-size: 70px;
  color: rgb(187, 0, 0);
}
.cross {
  position: absolute;
  top: 2px;
  right: 15px;
  cursor: pointer;
}
</style>
