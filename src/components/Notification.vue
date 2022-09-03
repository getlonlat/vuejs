<template>
  <div class="notification is-primary" v-if="showNotification">
    <span class="delete" @click="hideNotification"></span>
    Check the Leaflet version here:
    <a href="https://getlonlat.github.io/vuejs-leaflet/">
      https://getlonlat.github.io/vuejs-leaflet/
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    showNotification() {
      return this.$store.getters.showNotification;
    },
  },
  methods: {
    hideNotification() {
      this.$store.dispatch("hideNotification");
    },
  },
};
</script>
