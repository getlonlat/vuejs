<template>
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="">
          <img
            src="../assets/img/target.png"
            style="padding-right: 5px"
            alt=""
          />
          <span class="is-size-4">getLonLat</span>
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          :class="{'is-active' : toggleMenu}"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          @click="toggleMenu = !toggleMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenu" class="navbar-menu" :class="{'is-active' : toggleMenu}">
        <div class="navbar-end">
          <a
            class="navbar-item"
            href="https://github.com/getlonlat/vuejs"
            target="_blank"
          >
            about
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      toggleMenu: false
    };
  }
}
</script>