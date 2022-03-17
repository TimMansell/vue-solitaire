<template>
  <div :data-test="testId">
    <FontAwesomeIcon :icon="displayIcon" />
    {{ content }}
  </div>
</template>

<script>
import { faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'Toast',
  components: {
    FontAwesomeIcon,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      validator(value) {
        return ['clock', 'check-circle'].includes(value);
      },
      required: true,
    },
  },
  computed: {
    displayIcon() {
      const { icon } = this;
      const icons = [faClock, faCheckCircle];
      const iconToUse = icons.find(({ iconName }) => iconName === icon);

      return iconToUse;
    },
    testId() {
      const { id } = this;

      return `toast-${id}`;
    },
  },
};
</script>

<style lang="scss">
$vt-toast-min-width: auto;
$vt-color-default: var(--col-secondary);
$vt-text-color-default: var(--col-tertiary);

@import 'vue-toastification/src/scss/variables';
@import 'vue-toastification/src/scss/toastContainer';
@import 'vue-toastification/src/scss/toast';
@import 'vue-toastification/src/scss/progressBar';
@import 'vue-toastification/src/scss/animations/bounce';

/* stylelint-disable selector-class-pattern */
.Vue-Toastification {
  &__toast {
    margin-bottom: 0;

    @media (min-width: $bp-sm) {
      margin-bottom: var(--mg-lg);
    }
  }
}
/* stylelint-enable selector-class-pattern */
</style>
