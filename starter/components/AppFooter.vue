<template>
  <div class="footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-side footer-side-left">
          <p class="tl-5">Footer Should be here</p>
          <p class="tx-small footer-copyright">
            Copyright &copy; 2021 Company Name LLC. All rights reserved
          </p>
        </div>
        <div class="footer-side footer-side-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped lang="scss">
.footer {
  $this: &;
  display: flex;
  justify-content: center;

  &-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: $footer-height;
  }

  &-side {
  }

  &-logo {
    @include size(100px, 30px);
    background-color: clr(dark);

    &-container {
      font-size: 0;
      line-height: 0;
    }
  }

  &-nav {
    &-items {
      display: flex;
      align-items: center;
    }

    &-item {
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }

    &-link {
      display: block;
    }

    &-label {
    }
  }
}
</style>
