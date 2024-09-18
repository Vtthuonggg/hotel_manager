<template>
  <div>
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>
<script>
import NavBar from "./navbar_page.vue";
export default {
  components: {
    NavBar,
  },
};
</script>
