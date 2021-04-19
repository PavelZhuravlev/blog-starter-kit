<template>
  <div class="cld-img-holder" :style="{ paddingTop: cssRatio }">
    <img
      class="cld-img lazyload"
      :width="sizes.width"
      :height="sizes.height"
      :data-src="url"
      :data-lowsrc="lqipUrl"
      data-sizes="auto"
      :alt="alt"
    />
  </div>
</template>

<script>
import { calcCssRatio } from "~/utils/medias";

export default {
  props: {
    image: {
      type: Object,
      default: null,
    },
    ratio: {
      type: Number,
      default: null,
    },
    lqip: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      urlPrefix: `https://res.cloudinary.com/`,
    };
  },
  computed: {
    normalizedImage() {
      return (
        this.image || {
          width: 1200,
          height: 720,
          url:
            "https://res.cloudinary.com/pavelzhuravlev/image/upload/v1619045795/Skype_Picture_0ab87aad59.jpg",
          provider_metadata: {
            public_id: "Skype_Picture_0ab87aad59",
            resource_type: "image",
          },
        }
      );
    },
    publicId() {
      return this.normalizedImage.provider_metadata.public_id;
    },
    alt() {
      return (
        this.normalizedImage.alternativeText ||
        this.normalizedImage.caption ||
        "Image description"
      );
    },
    sizes() {
      const { width, height } = this.normalizedImage;
      return {
        width: width,
        height: this.ratio ? Math.floor(width / this.ratio) : height,
      };
    },
    cssRatio() {
      const { width, height } = this.sizes;
      return calcCssRatio(width, height);
    },
    version() {
      return this.normalizedImage.url.match(/v\d{10}/)[0];
    },
    url() {
      return this.generateUrl(["w_{width}"]);
    },
    lqipUrl() {
      return this.lqip && this.generateUrl(["e_blur:1000,w_0.1"]);
    },
  },
  methods: {
    generateUrl(extraParams = []) {
      const params = [
        "f_auto",
        "q_auto",
        "c_fill",
        ...extraParams,
        ...(this.ratio ? [`ar_${this.ratio.toFixed(1)}`] : []),
      ];
      const paramsStr = params.join(",");
      return `${this.urlPrefix}${this.$config.cldCloudName}/image/upload/${paramsStr}/${this.version}/${this.publicId}`;
    },
  },
};
</script>

<style lang="scss">
.cld-img {
  &.ls-blur-up-is-loading,
  &.lazyload:not([src]) {
    visibility: hidden;
  }
  &-holder {
    width: 100%;
    overflow: hidden;
    position: relative;
    .cld-img,
    .ls-blur-up-img {
      display: block;
      @include size(100%);
      @include position(absolute, 0 0 null null);
      object-fit: cover;
    }
    .ls-blur-up-img {
      filter: blur(5px);
      image-rendering: pixelated;
      transition: opacity 0.6s ease-in;
      opacity: 1;
      &.ls-inview.ls-original-loaded {
        opacity: 0;
      }
    }
  }
}
</style>
