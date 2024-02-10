<template>
  <div class="leads">
    <div class="leads__container">
      <div class="leads__sort-controls">
        <button @click="sort('price')">Сортировка по бюджету(по возрастанию)</button>
        <button @click="sort('name')">Сортировка по названию сделки(по возрастанию)</button>
      </div>
      <ui-select v-model="selectValue" :items="selectItems" class="leads__select" />
      <ui-list :items="leadsItems" :loading="loading">
        <template #default="{ item }">
          <lead-item :item="item" @sort="sort" />
        </template>
      </ui-list>
      <div class="leads__pagination">
        <div
          class="leads__pagination-control"
          :class="{ disabled: !links?.prev }"
          @click="page -= 1"
        >
          <
        </div>
        <div
          class="leads__pagination-control"
          :class="{ disabled: !links?.next }"
          @click="page += 1"
        >
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UiList from '@/components/lib/ui-list/ui-list.vue';
import UiSelect from '@/components/lib/ui-select/ui-select.vue';
import LeadItem from '@/components/listItem/lead-item.vue';

import { getLeads } from '@/api/leads.js';
import { ref, watch } from 'vue';

const leadsItems = ref([]);
const loading = ref(false);
const page = ref(1);
const links = ref(null);
const selectItems = [
  {
    name: 'Показывать по 2',
    value: 2
  },
  {
    name: 'Показывать по 5',
    value: 5
  },
  {
    name: 'Показывать по 10',
    value: 10
  },
  {
    name: 'Все',
    value: 250
  }
];
const selectValue = ref(selectItems[0]);

const setLeads = async () => {
  loading.value = true;
  try {
    const {
      data: { _embedded, _links }
    } = await getLeads(page.value, selectValue.value.value);

    leadsItems.value = _embedded.leads;
    links.value = _links;
  } catch (ex) {
    throw `${ex} load leads [list]`;
  } finally {
    loading.value = false;
  }
};

const sort = (field) => {
  leadsItems.value = leadsItems.value.sort((a, b) => (a[field] > b[field] ? 1 : -1));
};

watch(
  () => page.value,
  () => {
    setLeads();
  }
);

watch(
  () => selectValue.value,
  () => {
    setLeads();
  }
);

setLeads();
</script>

<style lang="scss" scoped>
.leads {
  display: flex;
  align-items: center;
  justify-content: center;

  &__select {
    padding: 15px;
  }

  &__container {
    background: var(--c-grey-700);
    border: solid 1px var(--c-grey-500);
    border-radius: 12px;
    width: 100%;
  }

  &__sort-controls {
    padding: 15px;
    gap: 12px;
    display: flex;

    button {
      padding: 5px 10px;
      background: var(--c-grey-300);
      color: var(--c-white);
      border: none;
      border-radius: 12px;
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        background: var(--c-grey-500);
      }
    }
  }

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    justify-content: space-between;
  }

  &__pagination-control {
    padding: 8px;
    background: #45b2ff;
    border-radius: 50px;
    cursor: pointer;

    &.disabled {
      pointer-events: none;
      background: var(--c-grey-300);
    }
  }
}
</style>
