<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="markdown-renderer" v-html="html"></div>
  <!-- eslint-enable vue/no-v-html -->
</template>

<script>
import Vue from "vue";
import CldImage from "~/components/CldImage";
import { renderMarkdown } from "~/utils/markdown";

export default {
  props: {
    markdown: {
      type: String,
      default: "# No content",
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    html() {
      return renderMarkdown(this.$md, this.markdown, this.images);
    },
  },
  mounted() {
    this.images.forEach(this.mountCldImage);
  },
  methods: {
    mountCldImage(image) {
      const propsData = {
        image: image,
        lqip: true,
      };
      const base64Url = Buffer.from(image.url).toString("base64");
      const component = new Vue({
        ...CldImage,
        ...{ propsData, parent: this },
      });
      component.$mount(`[data-img="${base64Url}"]`);
    },
  },
};
</script>

<style scoped lang="scss">
.markdown-renderer {
  &::v-deep {
    b {
      font-weight: fw(bold);
    }

    a {
      color: clr(primary);
    }

    .cld-img-holder {
      margin-top: $common-lh;
      &:first-child {
        top: 0;
      }
    }

    iframe {
      display: block;
      max-width: 100%;

      &:first-child {
        margin-top: 0;
      }
    }

    @for $i from 1 through length(map-get($title-sizes, xl)) {
      h#{$i} {
        @include title($i);
      }
    }

    h2,
    h3 {
      @include margin($common-lh null 1em null);
    }

    h4,
    h5,
    h6 {
      @include margin(1.5em null $common-lh null);

      &:first-child {
        margin-top: 0;
      }
    }

    p:empty {
      display: none;
    }

    p,
    ul,
    ol {
      margin-top: $common-lh;
      @include text(body);

      &:first-child {
        margin-top: 0;
      }
    }

    ul,
    ol {
      padding-left: 20px;
    }

    ul {
      list-style-type: disc;
    }

    ol {
      list-style-type: decimal;
    }

    blockquote {
      margin-top: $common-lh;
      padding: 1em;
      border-left: 6px solid #ccc;
      background: #f9f9f9;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
