<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Phòng: {{ room.name }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    title() {
      return this.$route.params.title;
    },
    room() {
      return this.$route.params.detail;
    },
  },
};
</script>
