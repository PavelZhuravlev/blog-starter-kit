<template>
  <div>
    <div class="card-list">
      <div class="row">
        <div
          v-for="article in allArticles"
          :key="article.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <div class="card-container">
            <ArticleCard :article="article" />
          </div>
        </div>
      </div>
    </div>
    <client-only v-if="lazy">
      <infinite-loading :identifier="lazyId" @infinite="infiniteHandler">
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import ArticleCard from "~/components/ArticleCard";

export default {
  components: {
    ArticleCard,
  },
  props: {
    articles: {
      type: Array,
      required: true,
      default: () => [],
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    lazyId: {
      type: Number,
      default: null,
    },
    lazyParams: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      lazyArticles: [],
      lazyLoadStepDelay: 500,
      lazyLoadStepCounter: 1,
    };
  },
  computed: {
    allArticles() {
      return [...this.articles, ...this.lazyArticles];
    },
  },
  watch: {
    lazyId() {
      this.lazyLoadStepCounter = 1;
      this.lazyArticles = [];
    },
  },
  methods: {
    infiniteHandler($state) {
      setTimeout(async () => {
        const extraArticles = await this.$loadArticles(
          this.lazyParams,
          this.lazyLoadStepCounter
        );
        if (extraArticles.length > 0) {
          this.lazyLoadStepCounter++;
          this.lazyArticles.push(...extraArticles);
          $state.loaded();
        } else {
          $state.complete();
        }
      }, this.lazyLoadStepDelay);
    },
  },
};
</script>
