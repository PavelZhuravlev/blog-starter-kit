<template>
  <div class="avatar" :style="{ width: `${size}px`, height: `${size}px` }">
    <CldImage :ratio="1" :image="image" />
  </div>
</template>

<script>
import CldImage from "~/components/CldImage";

export default {
  components: {
    CldImage,
  },
  props: {
    image: {
      type: Object,
      default: null,
      required: true,
    },
    size: {
      type: Number,
      default: 40,
    },
  },
};
</script>

<style scoped lang="scss">
.avatar {
  border-radius: 100%;
  overflow: hidden;

  &-img {
    @include size(100%);
    object-fit: cover;
  }
}
</style>
