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
  border: 1px solid var(--bdr-primary);
  border-radius: var(--bdr-radius-md);
  padding: var(--pd-sm);
  color: var(--text-primary);
  transition: all 0.2s;
  font-weight: 700;
  font-size: var(--font-size);
  text-decoration: none;
  font-family: var(--font-family);

  @media (min-width: $bp-sm) {
    font-size: var(--font-size-lg);
    border-width: 2px;
  }

  &:hover {
    background: var(--bg-primary);
    cursor: pointer;
  }

  & + & {
    border-left: 0;
  }

  &:last-of-type:not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:first-of-type:not(:last-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &--alt {
    background: var(--bg-primary);

    &:hover {
      background: var(--bg-primary-light);
    }
  }
}
</style>
