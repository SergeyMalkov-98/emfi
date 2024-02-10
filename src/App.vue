<template>
  <div class="container">
    <div class="app">
      <header>EMFI - тестовое задание (Мальков Сергей Павлович)</header>
      <leads />
    </div>
  </div>
</template>

<script setup>
import Leads from "@/components/leads.vue";
</script>

<style scoped lang="scss">
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: content-box;
}
.app {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
  }
}
</style>
