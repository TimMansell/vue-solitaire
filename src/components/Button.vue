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
  border-radius: 5px;
  padding: 0.5rem;
  color: #fff;
  transition: all 0.2s;
  font-weight: 700;
  font-size: 0.8rem;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;

  @media (min-width: $bp-sm) {
    font-size: 0.9rem;
  }

  &:hover {
    background: #027002;
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
    background: #027002;

    &:hover {
      background: lighten(#027002, 5%);
    }
  }
}
</style>
