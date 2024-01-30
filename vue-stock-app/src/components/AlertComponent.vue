<script setup>
import { useStore } from "vuex";
const store = useStore();
const { state } = store;

const alertMessage = state.alertStatus.message;
console.log(alertMessage, "alertMessage");

// When the alert status is true in Vuex this component is visible for 3 seconds after created and then disappears

setTimeout(
  () => store.commit("SET_ALERT_STATUS", { status: false, message: "" }),
  3000
);
</script>

<template>
  <!-- This is the alert component for unauthorized route navigation -->
  <div class="alert-component">
    <div class="alert-box">
      <span class="icon">&#9888;</span
      ><span class="message">{{ alertMessage }}</span>
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
  background-color: rgb(171, 167, 167);
  opacity: 0.5;
  /* backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px); */
  display: flex;
  justify-content: center;
  z-index: 10;
  padding-top: 100px;
}
.alert-box {
  width: 40%;
  height: fit-content;
  padding: 50px 30px;
  font-size: 20px;
  font-weight: 600;
  border: 2px solid grey;
  border-radius: 5px;
  background-color: rgba(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.message {
  text-align: center;
}
.icon {
  font-size: 70px;
  color: rgb(187, 0, 0);
}
</style>
