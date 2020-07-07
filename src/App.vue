<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <div v-if="isLoggedIn" key="app">
        <nav-bar @logout="isLoggedIn = false" />
        <transition name="fade" mode="out-in">
          <router-view :key="$route.name" />
        </transition>
      </div>
      <login v-else @login="isLoggedIn = true" key="login"></login>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import Login from "./views/Login.vue";
import NavBar from "./components/NavBar.vue";

export default defineComponent({
  name: "app",

  components: {
    Login,
    NavBar,
  },

  setup() {
    const isLoggedIn = ref(false);
    return { isLoggedIn };
  },
});
</script>

<style lang="scss">
@import "./style/main.scss";
</style>
