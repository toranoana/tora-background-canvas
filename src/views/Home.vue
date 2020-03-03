<template>
  <div class="home">
    <div class="row">
      <div class="linkimage">
        <router-link v-bind:to="{ name: 'texts-pages', params: { page: 0 } }">
          <img alt="Vue logo" src="../assets/logo.png" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style>
.linkimage {
  text-align: center;
}
</style>
