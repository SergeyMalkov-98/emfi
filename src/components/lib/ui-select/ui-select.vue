<template>
  <div class="ui-select">
    <div class="ui-select__view" @click="show = !show">
      {{ modelValue.name }}
    </div>
    <div class="ui-select__items" v-show="show">
      <div class="ui-select__item" @click="select(item)" v-for="(item, idx) in items" :key="idx">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  items: {
    type: Array,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const show = ref(false);

const select = (item) => {
  show.value = false;
  emit('update:modelValue', item);
};
</script>

<style lang="scss">
@use 'style';
</style>
