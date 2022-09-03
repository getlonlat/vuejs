<template>
  <div v-if="addressHistory.length > 0">
    <div class="input-group mb-1">
      <div class="input-group-text">
        <i class="fas fa-search" aria-hidden="true"></i>
      </div>
      <input
        class="form-control"
        type="search"
        placeholder="Filter search history"
        v-model="query"
      />
    </div>
    <nav class="list-group mb-3">
      <div
        class="list-group-item"
        v-for="address in addressHistory"
        :key="address.place_id"
      >
        <span
          class="text-danger"
          @click="deleteAddress(address)"
          title="Click to exclude address from history"
        >
          <i class="fas fa-trash-alt"></i>
        </span>
        <span @click="selectAddress(address)">
          {{ address.formatted_address }}
        </span>
      </div>

      <div class="list-group-item" v-if="addressHistory.length == 0">
        <small> Select some address to show here. </small>
      </div>
      <div class="list-group-item" v-if="addressHistory.length > 0">
        <button class="btn btn-sm btn-outline-danger" @click="clearHistory">
          Clear history
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  computed: {
    addressHistory() {
      return this.$store.getters.addressHistory.filter((item) => {
        return (
          item.formatted_address
            .toLowerCase()
            .indexOf(this.query.toLowerCase()) > -1
        );
      });
    },
  },
  methods: {
    selectAddress(address) {
      const latLng = {
        lat: address.geometry.location.lat,
        lng: address.geometry.location.lng,
      };
      this.$store.dispatch("setLatLng", latLng);
    },
    deleteAddress(address) {
      this.$swal({
        title: "Remove this address?",
        text: address.formatted_address,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch("deleteFromHistory", address);
        }
      });
    },
    clearHistory() {
      this.$store.dispatch("clearHistory");
    },
  },
};
</script>
