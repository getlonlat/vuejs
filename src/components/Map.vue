<template>
  <div>
    <div class="card">
      <header class="card-header">
        <a class="card-footer-item" @click="updatePosition">
          <span class="icon">
            <i class="fas fa-location-arrow"></i>
          </span>
          <span>UPDATE POSITION</span>
        </a>
        <a class="card-footer-item" @click="dropMarker">
          <span class="icon">
            <i class="fas fa-map-marker-alt"></i>
          </span>
          <span>DROP MARKER</span>
        </a>
      </header>
      <div class="card-image">
        <gmap-map
          ref="gmap"
          :center="mapCenter"
          :zoom="zoom"
          style="width: 100%; height: 520px"
        >
          <gmap-marker
            :position="markerPosition"
            :clickable="true"
            :draggable="true"
            @dragend="dragEnd"
            @click="clickMarker"
          />
        </gmap-map>
      </div>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <div class="control">
              <label class="label">Latitude</label>
              <div class="field has-addons">
                <div class="control">
                  <a class="button is-static">Y</a>
                </div>
                <div class="control">
                  <label>
                    <input
                      type="text"
                      class="input"
                      placeholder="Latitude"
                      :value="markerPosition.lat"
                    />
                  </label>
                </div>
                <div class="control">
                  <button
                    class="button is-light"
                    v-clipboard="() => markerPosition.lat"
                  >
                    <span class="icon">
                      <i class="far fa-copy"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <label class="label">Longitude</label>
            <div class="control">
              <div class="field has-addons">
                <div class="control">
                  <a class="button is-static">X</a>
                </div>
                <div class="control">
                  <label>
                    <input
                      type="text"
                      class="input"
                      placeholder="Longitude"
                      :value="markerPosition.lng"
                    />
                  </label>
                </div>
                <div class="control">
                  <button
                    class="button is-light"
                    v-clipboard="() => markerPosition.lng"
                  >
                    <span class="icon">
                      <i class="far fa-copy"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <label for="hash" class="label">Geohash</label>
            <div class="control">
              <div class="field has-addons">
                <div class="control">
                  <input
                    id="hash"
                    type="text"
                    class="input is-fullwidth"
                    placeholder="Geohash"
                    :value="hash"
                  />
                </div>
                <div class="control">
                  <button class="button is-light" v-clipboard="() => hash">
                    <span class="icon">
                      <i class="far fa-copy"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var geohash = require("ngeohash");

export default {
  data() {
    return {
      map: null
    };
  },
  computed: {
    zoom() {
      return this.$store.getters.zoom;
    },
    mapCenter() {
      return this.$store.getters.latLng;
    },
    markerPosition() {
      return this.$store.getters.latLng;
    },
    hash() {
      return geohash.encode(this.markerPosition.lat, this.markerPosition.lng);
    }
  },
  methods: {
    updatePosition() {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.$store.dispatch("setLatLng", latLng);
          this.$store.dispatch("setZoom", 15);
        },
        error => {
          console.error(error);
          // TODO: handle geolocation errors
        }
      );
    },
    dropMarker() {
      if (!this.map) {
        return;
      }

      const center = this.map.getCenter();
      const latLng = {
        lat: center.lat(),
        lng: center.lng()
      };
      this.$store.dispatch("setLatLng", latLng);
    },
    dragEnd(evt) {
      const latLng = { lat: evt.latLng.lat(), lng: evt.latLng.lng() };
      this.$store.dispatch("setLatLng", latLng);
    },
    clickMarker() {
      //  TODO: Center map when click marker
    },
    copy(value) {
      console.log("copied ", value);
    }
  },
  mounted() {
    var self = this;
    self.$refs.gmap.$mapPromise.then(() => {
      self.map = self.$refs.gmap.$mapObject;
    });
  }
};
</script>
