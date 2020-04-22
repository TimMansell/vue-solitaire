<template>
  <modal
    ref="modal"
    name="modal"
    classes="modal"
    height="auto"
    :scrollable="true"
    :reset="true"
    :adaptive="true"
    transition="scale"
  >
    <div class="modal__content">
      <button class="modal__close" @click="closeModal" data-test="close-modal">
        Close
      </button>
      <slot />
    </div>
  </modal>
</template>

<script>
export default {
  name: 'Controls',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$modal.hide('modal');
    },
  },
};
</script>

<style lang="scss">
.modal {
  &__close {
    position: absolute;
    right: 2rem;
  }

  &__content {
    padding: 1rem;
    background-color: white;
    text-align: left;
    border-radius: 3px;
    box-shadow: 0 0 20px -2px rgba(27, 33, 58, 0.4);
    margin: 1rem;
    left: 0;
    right: 0;
  }
}
</style>
