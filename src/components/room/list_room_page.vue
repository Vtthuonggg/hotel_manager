<template>
  <div class="container">
    <v-row class="row-title-item"
      ><h2 class="title">Danh sách phòng</h2>
      <v-btn
        class="gradient-button"
        @click="showCreateRoom"
        style="color: white"
      >
        <v-icon style="color: white">mdi-plus</v-icon>
        <span>Thêm phòng</span>
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <v-row justify="center" class="row-item">
      <v-col cols="12" md="6" lg="4">
        <v-card class="status-card">
          <v-list-item>
            <v-icon style="color: #23b84f" large
              >mdi-check-circle-outline</v-icon
            >
            <v-col>
              <div class="empty-text">
                <span>Còn trống:</span>
                <span class="count">{{ getAvailableRooms }}</span>
              </div>
              <v-divider></v-divider>
            </v-col>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="status-card">
          <v-list-item>
            <v-icon style="color: red" large>mdi-home-heart</v-icon>
            <v-col>
              <div class="empty-text">
                <span>Đang sử dụng:</span>
                <span class="count">{{ getUsingRooms }}</span>
              </div>
              <v-divider></v-divider>
            </v-col>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-container v-if="rooms.length > 0">
      <v-row>
        <v-col
          v-for="(room, index) in rooms"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="2"
        >
          <v-card
            :class="{
              'room-card-free': room.isAvailable,
              'room-card-using': !room.isAvailable,
            }"
            @click="createOrder(room)"
          >
            <v-list-item>
              <v-icon v-if="room.type === 1" large
                >mdi-bed-single-outline</v-icon
              >
              <v-icon v-else large>mdi-bed-double-outline</v-icon>
              <div class="room-info">
                <span>{{ room.name }}</span>
              </div>
              <v-spacer></v-spacer>
              <v-menu
                v-model="room.dropdown"
                :close-on-content-click="false"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="toggleDropdown(index)"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title
                      ><v-icon>mdi-pencil</v-icon>
                      <span @click="editRoom">Sửa</span>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title
                      ><v-icon>mdi-delete</v-icon>
                      <span @click="deleteRoom">Xóa</span></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="isShowCreateRoom" class="popup">
      <div class="popup-content">
        <h3>Tạo phòng mới</h3>
        <v-text-field v-model="newRoom.name" label="Tên phòng"></v-text-field>
        <v-radio-group v-model="newRoom.type" row>
          <v-radio label="Phòng đơn" value="1"></v-radio>
          <v-radio label="Phòng đôi" value="2"></v-radio>
        </v-radio-group>
        <div class="button-container">
          <v-btn
            class="gradient-button-cancel"
            style="color: #007bff"
            @click="hideCreateRoom"
            >Hủy</v-btn
          >
          <v-btn
            class="gradient-button-confirm"
            style="color: white"
            @click="addRoom"
            >Xác nhận</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      isShowCreateRoom: false,
      newRoom: {
        name: "",
        type: 1,
      },

      rooms: [
        {
          name: "P101",
          type: 1,
          price: 100000,
          isAvailable: true,
        },
        {
          name: "P102",
          type: 2,
          price: 200000,
          isAvailable: false,
        },
        {
          name: "P103",
          type: 1,
          price: 100000,
          isAvailable: true,
        },
        {
          name: "P104",
          type: 2,
          price: 200000,
          isAvailable: false,
        },
      ],
    };
  },
  methods: {
    toggleDropdown(index) {
      this.rooms[index].dropdown = !this.rooms[index].dropdown;
    },
    createOrder(room) {
      const title = room.isAvailable ? "Tạo đơn" : "Cập nhật đơn";
      this.$router.push({
        name: "CreateOrder",
        params: { title: title, detail: room },
      });
      title === "";
    },
    editRoom() {
      // Logic to show edit room popup with pre-filled information
      this.$emit("edit-room", this.room);
    },
    deleteRoom() {
      // Logic to delete the room from rooms
      this.$emit("delete-room", this.room);
    },
    showCreateRoom() {
      this.isShowCreateRoom = true;
      console.log(this.isShowCreateRoom);
    },
    hideCreateRoom() {
      this.isShowCreateRoom = false;
    },
    addRoom() {
      const roomType = parseInt(this.newRoom.type, 10);
      let price = 0;
      if (roomType === 1) {
        price = Cookies.get("singleRoomPrice");
      } else if (roomType === 2) {
        price = Cookies.get("doubleRoomPrice");
      }
      this.rooms.push({
        name: this.newRoom.name,
        type: roomType,
        price: price,
        isAvailable: true,
      });
      console.log(this.rooms);
      this.hideCreateRoom();
    },
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
.gradient-button-cancel {
  flex: 1;
  border: none;
  color: #23aeff;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 5px;
  cursor: pointer;
  border-radius: 12px;
  transition: background 0.3s ease;
}
.gradient-button-confirm {
  flex: 1;
  background: linear-gradient(45deg, #007bff, #00d4ff);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 5px;
  cursor: pointer;
  border-radius: 12px;
  transition: background 0.3s ease;
}
.button-container {
  display: flex;
  justify-content: space-between;
}
.gradient-button {
  background: linear-gradient(45deg, #007bff, #00d4ff);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition: background 0.3s ease;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
}
.row-title-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}

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
.room-card-using {
  background-color: greenyellow !important;
  padding: 10px;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.room-card-free:hover {
  background-color: #cfcfcf !important;
}
.room-card-using:hover {
  background-color: #7ebc21 !important;
}
.room-card-free {
  background-color: white !important;
  padding: 10px;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
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
