<template>
  <div>
    <div class="card-body">
      <div class="input-group">
        <div class="input-group-text">
          <i class="fas fa-search" aria-hidden="true"></i>
        </div>
        <input
          class="form-control form-control-sm"
          type="search"
          placeholder="Start typing to search for address"
          v-model="query"
          @keyup="searchAddress"
        />
      </div>
    </div>

    <div class="card-body search-address-results" v-if="addresses.length > 0">
      <div class="list-group">
        <a
          class="list-group-item"
          v-for="address in addresses"
          :key="address.place_id"
          @click="selectAddress(address)"
        >
          {{ address.formatted_address }}
        </a>
        <div class="list-group-item" @click="clearSearch">clear search</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      query: "",
      addresses: [],
      timer: null,
    };
  },
  computed: {
    zoom() {
      return this.$store.getters.zoom;
    },
  },
  methods: {
    searchAddress() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      if (!this.query) {
        return;
      }

      const params = {
        address: this.query,
        sensor: false,
        key: process.env.VUE_APP_MAPS_API_KEY,
      };

      this.timer = setTimeout(() => {
        axios
          .get(`https://maps.googleapis.com/maps/api/geocode/json`, { params })
          .then((result) => result.data)
          .then((result) => {
            this.addresses = result.results;
          });
      }, 500);
    },
    selectAddress(address) {
      const latLng = {
        lat: address.geometry.location.lat,
        lng: address.geometry.location.lng,
      };
      this.$store.dispatch("setZoom", 15);
      this.$store.dispatch("setLatLng", latLng);
      this.$store.dispatch("addToHistory", address);
    },
    clearSearch() {
      this.query = "";
      this.addresses = [];
    },
  },
};
</script>

<style>
.search-address-results {
  position: absolute;
  top: 40px;
  z-index: 1;
}
</style>
