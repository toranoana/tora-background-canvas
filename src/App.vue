<template>
  <div id="app">
    <canvas-background />
    <div class="container">
      <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link v-bind:to="{ name: 'texts-pages', params: { page: 0 } }">テキスト</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import CanvasBackground from "@/components/CanvasBackGround.vue";

export default {
  name: "app",
  components: {
    CanvasBackground
  }
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}

#nav {
  padding: 30px 0px;
}
* {
  color: #ececec;
}
a {
  font-weight: bold;
  color: #e3e3e3;
  font-size: 17px;
}
</style>
