<template>
  <nav class="panel">
    <p class="panel-heading">
      history
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <label>
          <input
            class="input is-small"
            type="search"
            placeholder="filter"
            v-model="query"
          />
        </label>
        <span class="icon is-small is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>
    <a
      class="panel-block"
      v-for="address in addressHistory"
      :key="address.place_id"
      @click="selectAddress(address)"
    >
      <span class="panel-icon" @click="deleteAddress(address)">
        <i class="delete" aria-hidden="true"></i>
      </span>
      <span>
        {{ address.formatted_address }}
      </span>
    </a>
    <div class="panel-block" v-if="addressHistory.length == 0">
      <small>
        Select some address to show here.
      </small>
    </div>
    <div class="panel-block" v-if="addressHistory.length > 0">
      <button
        class="button is-link is-outlined is-fullwidth is-small"
        @click="clearHistory"
      >
        reset all filters
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      query: ""
    };
  },
  computed: {
    addressHistory() {
      return this.$store.getters.addressHistory.filter(item => {
        return (
          item.formatted_address
            .toLowerCase()
            .indexOf(this.query.toLowerCase()) > -1
        );
      });
    }
  },
  methods: {
    selectAddress(address) {
      const latLng = {
        lat: address.geometry.location.lat,
        lng: address.geometry.location.lng
      };
      this.$store.dispatch("setLatLng", latLng);
    },
    deleteAddress(address) {
      this.$swal({
        title: "Remove this address?",
        text: address.formatted_address,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("deleteFromHistory", address);
        }
      });
    },
    clearHistory() {
      this.$store.dispatch("clearHistory");
    }
  }
};
</script>
