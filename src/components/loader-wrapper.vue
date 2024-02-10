<template>
  <div :class="['loader-wrapper', { 'loader-wrapper--loading': loading }]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.loader-wrapper {
  height: 100%;
  transition: opacity 0.5s;

  &--loading {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
