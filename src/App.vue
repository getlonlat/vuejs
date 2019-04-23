<template>
  <div class="container">
    <app-header></app-header>
    <app-notification></app-notification>
    <div class="columns">
      <div class="column">
        <app-map></app-map>
        <div :class="{ 'is-hidden': !showSearchAddress }">
          <app-search-address></app-search-address>
        </div>
      </div>
      <div
        class="column is-one-third"
        :class="{ 'is-hidden': addressHistory.length === 0 }"
      >
        <app-history></app-history>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Notification from "./components/Notification.vue";
import Map from "./components/Map.vue";
import SearchAddress from "./components/SearchAddress.vue";
import History from "./components/History.vue";

export default {
  computed: {
    showSearchAddress() {
      return this.$store.getters.showSearchAddress;
    },
    addressHistory() {
      return this.$store.getters.addressHistory;
    }
  },
  components: {
    appHeader: Header,
    appNotification: Notification,
    appMap: Map,
    appHistory: History,
    appSearchAddress: SearchAddress
  }
};
</script>
