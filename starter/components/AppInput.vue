<template>
  <div class="input" :class="{ 'input-error': errors.length }">
    <div class="input-inner">
      <slot></slot>
    </div>
    <div v-if="errors.length" class="input-message-list">
      <p
        v-for="error in errors"
        :key="error"
        class="input-message input-message-error"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.input {
  position: relative;
  &-inner {
    position: relative;
  }
  #{$all-text-inputs} {
    width: 100%;
    @include padding(8px 15px);
    height: $form-el-height;
    border: thin solid clr(dark);
    background-color: clr(light);
    @include text($lh: normal);
    &::placeholder {
      color: rgba(clr(typo), 0.3);
    }
  }
  &-label {
  }
  &-container {
  }
  &-message {
    margin-top: 3px;
    @include text(small);
    font-size: 12px;
    &-error {
      color: clr(danger);
    }
    &-list {
      @include position(absolute, 100% 0 null 0);
      text-align: left;
    }
  }
  &-error {
    #{$all-text-inputs},
    #{$all-text-inputs-focus} {
      border-color: clr(danger);
    }
  }
}
</style>
