<template>
  <div>
    <section class="section">
      <div class="container">
        <app-header></app-header>
        <div class="columns">
          <div class="column">
            <app-map></app-map>
          </div>
          <div class="column is-one-third" :class="{'is-hidden': !showSearchAddress}">
            <app-search-address></app-search-address>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import SearchAddress from "./components/SearchAddress.vue";

export default {
  computed: {
    showSearchAddress() {
      return this.$store.getters.showSearchAddress;
    }
  },
  components: {
    appHeader: Header,
    appMap: Map,
    appSearchAddress: SearchAddress
  }
};
</script>
