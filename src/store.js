import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  zoom: 4,
  address: null,
  latLng: {
    lat: -8,
    lng: -55
  }
};

const getters = {
  zoom: state => {
    return state.zoom;
  },
  address: state => {
    return state.address;
  },
  latLng: state => {
    return state.latLng;
  }
};

const mutations = {
  SET_ZOOM(state, zoom) {
    state.zoom = zoom;
  },
  SET_ADDRESS(state, address) {
    state.address = address;
  },
  SET_LATLNG(state, latLng) {
    state.latLng = latLng;
  }
};

const actions = {
  setZoom({ commit }, zoom) {
    commit("SET_ZOOM", zoom);
  },
  setLatLng: function ({ commit }, latLng) {
    commit("SET_LATLNG", latLng);

    const params = {
      key: process.env.VUE_APP_MAPS_API_KEY,
      latlng: `${latLng.lat},${latLng.lng}`,
      sensor: false
    };
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", { params })
      .then(result => {
        if (result.data.results[0]) {
          const address = result.data.results[0].formatted_address;
          commit("SET_ADDRESS", address);
        }
      });
  }
};

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
