<template>
  <loader-wrapper :loading="loading">
    <div class="ui-list">
      <div class="ui-list__items">
        <div v-for="item in items" class="ui-list__item" :key="item">
          <slot v-bind="{ item }" />
        </div>
      </div>
      <div v-if="!items.length"
class="ui-list__empty">
        <slot name="empty" />
      </div>
    </div>
  </loader-wrapper>
</template>

<script setup>
import LoaderWrapper from "@/components/loader-wrapper.vue";

const props = defineProps({
  items: {
    type: Array,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss">
@use "style";
</style>
