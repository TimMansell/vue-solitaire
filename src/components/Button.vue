<template>
  <button class="btn" :class="classes" @click="click">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    alt: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { alt } = this;

      return {
        'btn--alt': alt,
      };
    },
  },
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
.btn {
  background: transparent;
  border: 2px solid #fff;
  padding: 0.5rem;
  color: #fff;
  transition: all 0.2s;
  font-weight: 700;

  &:hover {
    background: #027002;
    cursor: pointer;
  }

  &:first-of-type {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: 0;
  }

  &:last-of-type {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &--alt {
    background: #027002;

    &:hover {
      background: lighten(#027002, 5%);
    }
  }
}
</style>
