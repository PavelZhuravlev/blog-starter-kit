<template>
  <div v-if="seo" class="share-action-list">
    <div class="share-action-list-inner">
      <div
        v-for="network in transformedNetworks"
        :key="network.name"
        class="share-action-container"
      >
        <button class="share-action">
          <ShareNetwork
            :network="network.name"
            :title="socialNetworkProps.title"
            :description="socialNetworkProps.description"
            :media="socialNetworkProps.media"
            :url="socialNetworkProps.url"
          >
            Share on {{ network.name }}
          </ShareNetwork>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seo: {
      type: Object,
      required: true,
    },
    networks: {
      type: Array,
      default: () => [
        "facebook",
        "twitter",
        "linkedin",
        "pinterest",
        "reddit",
        "email",
        "telegram",
      ],
    },
  },
  computed: {
    transformedNetworks() {
      return this.networks.map((name) => ({ name }));
    },
    socialNetworkProps() {
      const { metaTitle, metaDescription, shareImage } = this.seo;
      const url = `${this.$config.baseUrl}${this.$nuxt.$route.path}`;
      return {
        url: url,
        title: metaTitle,
        description: metaDescription,
        media: shareImage.url,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.share-action {
  $gutter: 10px;
  background-color: clr(dark);
  color: clr(light);
  @include padding(8px);
  &-container {
    @include padding(null $gutter / 2 $gutter $gutter / 2);
  }
  &-list {
    &-inner {
      display: flex;
      flex-wrap: wrap;
      @include margin(null $gutter / -2 $gutter / -1 $gutter / -2);
    }
  }
}
</style>
