<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="row">
    <div class="col-lg-4">
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="">Longitude</label>
                <div class="input-group">
                  <label class="input-group-text">X</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Longitude"
                    :value="markerPosition.lng"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    v-clipboard="() => markerPosition.lng"
                    v-clipboard:success="clipboardSuccessHandler"
                  >
                    <span class="icon">
                      <i class="far fa-copy"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="">Latitude</label>
                <div class="input-group">
                  <span class="input-group-text">Y</span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Latitude"
                    :value="markerPosition.lat"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    v-clipboard="() => markerPosition.lat"
                    v-clipboard:success="clipboardSuccessHandler"
                    title="Click to copy"
                  >
                    <span class="icon">
                      <i class="far fa-copy"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="input-group">
              <label for="hash" class="input-group-text">Geohash</label>
              <input
                id="hash"
                type="text"
                class="form-control"
                placeholder="Geohash"
                :value="hash"
              />
              <button
                class="btn btn-outline-secondary"
                v-clipboard="() => hash"
                v-clipboard:success="clipboardSuccessHandler"
              >
                <span class="icon">
                  <i class="far fa-copy"></i>
                </span>
              </button>
            </div>
          </div>
          <div class="mb-3" v-if="address">
            <label for="address" class="">Address</label>
            <div class="input-group">
              <textarea rows="2" class="form-control" v-model="address" />
              <button
                class="btn btn-outline-secondary"
                v-clipboard="() => address"
                v-clipboard:success="clipboardSuccessHandler"
              >
                <span class="icon">
                  <i class="far fa-copy"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <app-history></app-history>
    </div>

    <div class="col-lg-8">
      <div class="card">
        <div class="row">
          <div class="col-lg-8">
            <app-search-address></app-search-address>
          </div>
          <div class="col-lg-4">
            <div class="card-body">
              <div class="btn-group" role="group" aria-label="Toolbar">
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="updatePosition"
                >
                  USE GEOLOCATION
                </button>
                <button
                  class="btn btn-sm btn-outline-secondary"
                  @click="dropMarker"
                >
                  DROP MARKER
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card-image">
          <gmap-map ref="gmap" class="map" :center="mapCenter" :zoom="zoom">
            <gmap-marker
              :position="markerPosition"
              :clickable="true"
              :draggable="true"
              @dragend="dragEnd"
            />
          </gmap-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchAddress from "./SearchAddress.vue";
import History from "./History.vue";

var geohash = require("ngeohash");

export default {
  data() {
    return {
      map: null,
    };
  },
  computed: {
    zoom() {
      return this.$store.getters.zoom;
    },
    address() {
      return this.$store.getters.address;
    },
    mapCenter() {
      return this.$store.getters.latLng;
    },
    markerPosition() {
      return this.$store.getters.latLng;
    },
    hash() {
      return geohash.encode(this.markerPosition.lat, this.markerPosition.lng);
    },
  },
  methods: {
    updatePosition() {
      navigator.geolocation.getCurrentPosition((position) => {
        const latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.$store.dispatch("setLatLng", latLng);
        this.$store.dispatch("setZoom", 15);
      });
    },
    dropMarker() {
      if (!this.map) {
        return;
      }

      const center = this.map.getCenter();
      const latLng = {
        lat: center.lat(),
        lng: center.lng(),
      };
      this.$store.dispatch("setLatLng", latLng);
    },
    dragEnd(evt) {
      const latLng = { lat: evt.latLng.lat(), lng: evt.latLng.lng() };
      this.$store.dispatch("setLatLng", latLng);
    },
    toggleSearchAddress() {
      this.$store.dispatch("toggleSearchAddress");
    },
    clipboardSuccessHandler() {
      this.$toasted.show("Copied to clipboard.");
    },
  },
  mounted() {
    var self = this;
    self.$refs.gmap.$mapPromise.then(() => {
      self.map = self.$refs.gmap.$mapObject;
    });
  },
  components: {
    appSearchAddress: SearchAddress,
    appHistory: History,
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 520px;
}

@media (max-width: 600px) {
  .map {
    height: 250px;
  }
}
</style>
