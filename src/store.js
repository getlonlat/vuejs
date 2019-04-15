import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  zoom: 4,
  latLng: {
    lat: -8,
    lng: -55
  }
};

const getters = {
  zoom: state => {
    return state.zoom;
  },
  latLng: state => {
    return state.latLng;
  }
};

const mutations = {
  SET_ZOOM(state, zoom) {
    state.zoom = zoom;
  },
  SET_LATLNG(state, latLng) {
    state.latLng = latLng;
  }
};

const actions = {
  setZoom({commit}, zoom) {
    commit("SET_ZOOM", zoom);
  },
  setLatLng({commit}, latLng) {
    commit("SET_LATLNG", latLng);
  }
};

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
