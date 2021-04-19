<template>
  <div class="card">
    <nuxt-link
      :key="article.id"
      :to="{ name: 'articles-slug', params: { slug: article.slug } }"
    >
      <div class="card-inner">
        <CldImage
          lqip
          :ratio="1.5"
          :image="article.image"
          class="card-banner"
        />
        <div class="card-content">
          <p class="tl-4 card-title">{{ article.title }}</p>
          <p v-if="article.category" class="tx-body card-category">
            {{ article.category.name }}
          </p>
          <p v-if="publishedDate" class="tx-body card-date">
            {{ publishedDate }}
          </p>
          <div v-if="article.author" class="card-author">
            <AppAvatar :image="article.author.picture" />
            <p class="tx-small card-author-name">{{ article.author.name }}</p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { format } from "date-fns";
import CldImage from "~/components/CldImage";
import AppAvatar from "~/components/AppAvatar";

export default {
  components: {
    CldImage,
    AppAvatar,
  },
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    publishedDate() {
      return (
        this.article.publishedAt &&
        format(new Date(this.article.publishedAt), "MMM do yy")
      );
    },
  },
};
</script>

<style scoped lang="scss">
.card {
}
</style>
