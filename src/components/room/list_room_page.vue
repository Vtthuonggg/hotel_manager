<template>
  <div class="container">
    <h2 class="title">Danh sách phòng</h2>
    <v-divider></v-divider>
    <v-row justify="center" class="row-item">
      <v-col cols="12" md="6" lg="4">
        <v-card class="status-card">
          <v-list-item>
            <v-icon style="color: #23b84f" large
              >mdi-check-circle-outline</v-icon
            >
            <div class="empty-text">
              <span>Còn trống:</span>
              <span class="count">{{ getAvailableRooms }}</span>
            </div>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="status-card">
          <v-list-item>
            <v-icon style="color: red" large>mdi-home-heart</v-icon>
            <div class="empty-text">
              <span>Đang sử dụng:</span>
              <span class="count">{{ getUsingRooms }}</span>
            </div>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-container>
      <v-row>
        <v-col
          v-for="room in rooms"
          :key="room.id"
          cols="12"
          sm="6"
          md="4"
          lg="2"
        >
          <v-card class="room-card">
            <v-list-item>
              <v-icon large>mdi-bed-empty</v-icon>
              <div class="room-info">
                <span>{{ room.name }}</span>
              </div>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
          isAvailable: true,
        },
        {
          id: 2,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 3,
          name: "P103",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: false,
        },
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 2,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 3,
          name: "P103",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: false,
        },
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 2,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 3,
          name: "P103",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: false,
        },
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 2,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 3,
          name: "P103",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: false,
        },
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 2,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 3,
          name: "P103",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: false,
        },
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 2,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 3,
          name: "P103",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: false,
        },
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 2,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 3,
          name: "P103",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: false,
        },
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 2,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 3,
          name: "P103",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: false,
        },
        {
          id: 1,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 2,
          name: "P102",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: true,
        },
        {
          id: 3,
          name: "P103",
          description: "Phòng đơn",
          pice: 1000,
          isAvailable: false,
        },
      ],
    };
  },
  computed: {
    getAvailableRooms() {
      return this.rooms.filter((room) => room.isAvailable).length;
    },
    getUsingRooms() {
      return this.rooms.filter((room) => !room.isAvailable).length;
    },
  },
};
</script>

<style scoped>
.count {
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
}
.row-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.status-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 80px;
  margin-bottom: 20px;
  border-radius: 0 0 15px 15px !important;
}
.room-card {
  padding: 10px;
  text-align: center;
  margin-bottom: 10px;
}
.room-info {
  margin-left: 10px;
  font-weight: bold;
}
.title {
  text-align: left;
  margin: 10px;
}
.empty-text {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  font-weight: bold;
  width: 100%;
}
.container {
  width: 100%;
  flex-direction: column;
  align-items: center;
}
</style>
