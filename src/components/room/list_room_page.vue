<template>
  <div>
    <h1>Danh sách phòng</h1>
    <v-divider></v-divider>
    <v-row>
      <v-card>
        <v-list-item>
          <v-icon style="color: green" large>mdi-check-circle-outline</v-icon>
          <div class="empty-text">
            <span>Còn trống</span>
          </div>
        </v-list-item>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
        },
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
        },
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh ở đây nếu cần */
</style>
