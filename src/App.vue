<template>
  <div>
    <section class="section">
      <div class="container">
        <app-header></app-header>
        <app-map></app-map>
        <app-search-address></app-search-address>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import SearchAddress from "./components/SearchAddress.vue";

export default {
  components: {
    appHeader: Header,
    appMap: Map,
    appSearchAddress: SearchAddress
  }
};
</script>
