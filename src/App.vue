<template>
  <div class="container">
    <app-header></app-header>
    <app-map></app-map>
    <div :class="{ 'is-hidden': !showSearchAddress }">
      <app-search-address></app-search-address>
    </div>
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
