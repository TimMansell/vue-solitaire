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
    <div class="modal__content" data-test="modal-content">
      <Button alt class="modal__close" @click="closeModal" data-test="close-modal">
        Close
      </Button>
      <slot />
    </div>
  </modal>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'Controls',
  components: {
    Button,
  },
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
    background-color: #fff;
    text-align: left;
    border-radius: 3px;
    box-shadow: 0 0 20px -2px rgba(27, 33, 58, 0.4);
    margin: 1rem;
    left: 0;
    right: 0;
  }
}
</style>
