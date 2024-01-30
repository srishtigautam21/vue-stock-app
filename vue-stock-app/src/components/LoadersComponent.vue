<template>
  <!-- <div class="background"> -->
  <div class="loader"></div>
  <!-- </div> -->
</template>

<style scoped>
/* HTML: <div class="loader"></div> */
.background {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-color: rgb(180, 176, 176);
  opacity: 0.3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loader {
  position: fixed;
  top: 50%;
  right: 50%;
  z-index: 99999;
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #2566b0;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
