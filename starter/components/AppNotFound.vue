<template>
  <div>
    <h1 class="tl-3">{{ title }}</h1>
    <p class="tx-big">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "No results were found.",
    },
    description: {
      type: String,
      default: "Sorry, we couldn't find any results for you.",
    },
  },
};
</script>

<style scoped></style>
