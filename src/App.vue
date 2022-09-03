<template>
  <div>
    <app-header class="mb-3"></app-header>
    <div class="container-fluid">
      <app-map></app-map>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";

export default {
  computed: {
    showSearchAddress() {
      return this.$store.getters.showSearchAddress;
    },
    addressHistory() {
      return this.$store.getters.addressHistory;
    },
  },
  components: {
    appHeader: Header,
    appMap: Map,
  },
};
</script>
