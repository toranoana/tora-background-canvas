<template>
  <div class="texts-pages">
    <div class="row">
      <h2>変身</h2>
      <h3>フランツ・カフカ</h3>
      <h5>原田義人訳</h5>
    </div>
    <div class="row">{{ texts[$route.params.page] }}</div>
    <div class="row pager">
      <div class="six columns">
        <div v-if="allowprev">
          <router-link v-bind:to="{ name: 'texts-pages', params: { page: prevpage } }">前へ</router-link>
        </div>
        <div v-else>
          <span class="link-disabled">前へ</span>
        </div>
      </div>
      <div class="six columns">
        <div v-if="allownext">
          <router-link v-bind:to="{ name: 'texts-pages', params: { page: nextpage } }">次へ</router-link>
        </div>
        <div v-else>
          <span class="link-disabled">次へ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "texts-pages",
  data: function() {
    return {
      texts: ""
    };
  },
  computed: {
    nextpage: function() {
      let rqpage = Number(this.$route.params.page);
      return rqpage === this.texts.length ? rqpqge : rqpage + 1;
    },
    prevpage: function() {
      let rqpage = Number(this.$route.params.page);
      return rqpage === 0 ? rqpage : rqpage - 1;
    },

    allownext: function() {
      let rqpage = Number(this.$route.params.page);
      return rqpage < this.texts.length - 1;
    },
    allowprev: function() {
      let rqpage = Number(this.$route.params.page);
      return rqpage > 0;
    }
  },
  mounted() {
    axios.get("/texts.json").then(response => (this.texts = response.data));
  }
};
</script>

<style>
.pager {
  margin-top: 10px;
  text-align: center;
}
.link-disabled {
  color: #d3d3d3;
  font-weight: bold;
  font-size: 14px;
}
</style>
