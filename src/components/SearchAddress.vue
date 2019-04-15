<template>
  <div>
    <div>
      <nav class="panel">
        <p class="panel-heading">Search for places</p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <label>
              <input
                class="input is-small"
                type="search"
                placeholder="Start type the address"
                v-model="query"
                @keyup="searchAddress"
              />
            </label>
            <span class="icon is-small is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <a
          class="panel-block"
          v-for="address in addresses"
          :key="address.place_id"
          @click="selectAddress(address)"
        >
          {{ address.formatted_address }}
        </a>
        <div class="panel-block" v-if="addresses.length > 0">
          <button
            class="button is-link is-outlined is-fullwidth is-small"
            @click="clearSearch"
          >
            clear search
          </button>
        </div>
      </nav>
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
      timer: null
    };
  },
  computed: {
    zoom() {
      return this.$store.getters.zoom;
    }
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
        key: process.env.VUE_APP_MAPS_API_KEY
      };

      this.timer = setTimeout(() => {
        axios
          .get(`https://maps.googleapis.com/maps/api/geocode/json`, { params })
          .then(result => result.data)
          .then(result => {
            this.addresses = result.results;
          });
      }, 500);
    },
    selectAddress(address) {
      const latLng = {
        lat: address.geometry.location.lat,
        lng: address.geometry.location.lng
      };
      this.$store.dispatch("setZoom", 15);
      this.$store.dispatch("setLatLng", latLng);
    },
    clearSearch() {
      this.query = "";
      this.addresses = [];
    }
  }
};
</script>
