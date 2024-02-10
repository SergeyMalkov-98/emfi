<template>
  <div class="lead-item">
    <div class="lead-item__info">
      <div class="lead-item__info-label">Название сделки</div>
      {{ item.name }}
    </div>
    <div class="lead-item__info">
      <div class="lead-item__info-label">Бюджет</div>
      {{ formatPrice.format(item.price) }}
    </div>
    <div class="lead-item__info">
      <div class="lead-item__info-label">Дата создания</div>
      {{ getDate(props.item.created_at) }}
    </div>
    <div class="lead-item__info">
      <div class="lead-item__info-label">Дата обновления</div>
      {{ getDate(props.item.updated_at) }}
    </div>
    <div v-if="showCompani" class="lead-item__info">
      <div class="lead-item__info-label">Компания</div>
      <div v-if="!loadCompani" class="lead-item__compani-info">
        <span v-show="!compani" @click="getCompany">получить компанию</span>
        <span v-show="compani" @click="getCompany">{{ compani?.name }}</span>
      </div>
      <ui-spinner v-else />
    </div>
  </div>
</template>

<script setup>
import UiSpinner from '@/components/lib/ui-spinner/ui-spinner.vue';

import dayjs from 'dayjs';
import { getCompani } from '@/api/companies.js';
import { computed, ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  sorted: {
    type: String,
    default: ''
  }
});

const compani = ref(null);
const loadCompani = ref(false);

const formatPrice = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB'
});

const getDate = (unix) => {
  return dayjs(new Date(unix * 1000)).format('DD.MM.YYYY hh:mm:ss');
};

const showCompani = computed(() => !!props.item._embedded.companies.length);

const getCompany = async () => {
  if (compani.value) return;
  loadCompani.value = true;

  try {
    const {
      data: {
        _embedded: { companies }
      }
    } = await getCompani(props.item._embedded.companies[0].id);

    compani.value = companies[0];
  } catch (ex) {
    throw `${ex} load compani [byId]`;
  } finally {
    loadCompani.value = false;
  }
};
</script>

<style lang="scss" scoped>
.lead-item {
  background: var(--c-grey-300);
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 16px;
  grid-template-columns: 2fr 2fr 1fr 1.4fr 1.3fr;

  &__info-label {
    text-wrap: nowrap;
    font-size: 12px;
    color: var(--c-blue);
    font-weight: 800;
    margin-bottom: 8px;
  }

  &__compani-info {
    span:first-child {
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        color: var(--c-blue);
      }
    }
  }
}
</style>
