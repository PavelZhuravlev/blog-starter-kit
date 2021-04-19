<template>
  <div v-if="seo" class="share-action-list">
    <button
      v-for="network in transformedNetworks"
      :key="network.name"
      class="share-action"
    >
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
  background-color: clr(dark);
  color: clr(light);
  @include padding(8px);
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
