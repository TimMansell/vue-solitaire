<template>
  <span class="select">
    <select :value="value" @change="$emit('select', $event.target.value)">
      <option v-for="(item, index) in items" :key="index">{{ item }}</option>
    </select>
  </span>
</template>

<script>
export default {
  name: 'Select',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.select {
  display: inline-block;
  margin-bottom: var(--mg-md);
}
</style>
