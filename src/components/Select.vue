<template>
  <div class="select">
    <label class="select__label" :for="id">{{ label }}</label>
    <select
      class="select__dropdown"
      :id="id"
      :value="value"
      @change="$emit('select', $event.target.value)"
      data-test="select"
    >
      <option v-for="(item, index) in items" :key="index">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    id() {
      const { label } = this;

      return label.split(' ').join('-');
    },
  },
};
</script>

<style scoped lang="scss">
.select {
  &__label {
    margin-right: var(--mg-sm);
  }

  &__dropdown {
    padding: var(--pd-xs);
    border: 1px solid var(--bdr-primary);
    border-radius: var(--bdr-radius-md);
    background: var(--bg-secondary);
  }
}
</style>
