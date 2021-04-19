import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

Vue.use(InfiniteLoading, {
  slots: {
    spinner: "Loading...",
    noMore: "No more articles yet",
    noResults: "No more articles yet",
  },
});
