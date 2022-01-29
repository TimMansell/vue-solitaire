<template>
  <transition v-if="showIf">
    <div class="toast" data-test="toast">
      <div class="toast__wrapper">
        <div class="toast__content">
          <div class="toast__msg">
            <div v-for="(msg, index) in msgs" :key="index">
              {{ msg }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    msgs: {
      type: Array,
      required: true,
    },
    duration: {
      type: Number,
      default: 5000,
    },
    show: {
      type: Boolean,
      default: false,
    },
    timer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showIf: this.show,
    };
  },
  mounted() {
    const { timer } = this;

    if (!timer) return;

    this.setTimer();
  },
  watch: {
    show() {
      this.setTimer();
    },
  },
  methods: {
    setTimer() {
      const { duration } = this;

      setTimeout(() => {
        this.showIf = false;
      }, duration);
    },
  },
};
</script>

<style scoped lang="scss">
.toast {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 4vh;
  width: 100%;
  z-index: calc(var(--z-overlay) + 1);
  padding: var(--pd-sm);
  color: var(--col-tertiary);

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid var(--bdr-secondary);
    border-radius: var(--bdr-radius-lg);
    padding: var(--pd-sm);
    background: var(--bg-secondary);
    box-shadow: 0 0 var(--bdr-radius-lg) 2px var(--col-primary);
  }

  &__content {
    flex: 1;
    width: 100%;
    text-align: left;
  }

  &__msg {
    font-size: var(--font-size-sm);
    text-align: center;

    @media (min-width: $bp-sm) {
      font-size: var(--font-size);
    }
  }
}
</style>
