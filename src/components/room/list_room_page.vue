<template>
  <div class="container">
    <v-row class="row-title-item">
      <h2 class="title">Danh sách phòng</h2>
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
          <v-menu v-model="menu" :close-on-content-click="false" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-card
                :class="{
                  'room-card-free': room.available,
                  'room-card-using': !room.available,
                }"
                v-bind="attrs"
                v-on="on"
                @click="selectRoom(index)"
              >
                <v-list-item>
                  <v-icon v-if="room.type === 1" large
                    >mdi-bed-single-outline</v-icon
                  >
                  <v-icon v-else large>mdi-bed-double-outline</v-icon>
                  <div class="room-info">
                    <span>{{ room.numberRoom }}</span>
                  </div>
                  <v-spacer></v-spacer>
                </v-list-item>
              </v-card>
            </template>
            <v-list v-if="selectedRoom === index">
              <v-list-item v-if="room.isAvailable" @click="startTimer">
                <v-icon>mdi-clock</v-icon>
                <v-list-item-title>Bắt đầu tính giờ</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="room.isAvailable" @click="editRoom">
                <v-icon>mdi-pencil</v-icon>
                <v-list-item-title>Sửa</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="room.isAvailable" @click="deleteRoom">
                <v-icon>mdi-close</v-icon>
                <v-list-item-title>Xóa</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="room.isAvailable" @click="startTimer">
                <v-icon>mdi-cash-edit</v-icon>
                <v-list-item-title>Sửa giá phòng</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="!room.isAvailable" @click="stopTimer">
                <v-icon>mdi-clock-check</v-icon>
                <v-list-item-title>Ngừng tính giờ</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="!room.isAvailable" @click="checkout">
                <v-icon>mdi-currency-usd</v-icon>
                <v-list-item-title>Thanh Toán</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="!room.isAvailable" @click="addService">
                <v-icon>mdi-room-service</v-icon>

                <v-list-item-title>Thêm dịch vụ</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="isShowCreateRoom" class="popup">
      <div class="popup-content">
        <h3>Tạo phòng mới</h3>
        <v-text-field v-model="newRoom.name" label="Tên phòng"></v-text-field>
        <v-text-field
          v-model="newRoom.price"
          label="Giá phòng"
          v-mask="dynamicMask"
        ></v-text-field>
        <v-radio-group v-model="newRoom.type" row>
          <v-radio color="#1db4f0" label="Phòng đơn" value="1"></v-radio>
          <v-radio color="#1db4f0" label="Phòng đôi" value="2"></v-radio>
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
import { getListRoom, createRoom } from "@/api/room_api.js";
import { mask } from "vue-the-mask";
export default {
  data() {
    return {
      selectedRoom: null,
      menu: false,
      isShowCreateRoom: false,
      newRoom: {
        name: "",
        type: 1,
        price: "",
      },

      rooms: [],
    };
  },
  directives: {
    mask,
  },
  created() {
    this.fetchListRooom();
  },
  methods: {
    async fetchListRooom() {
      try {
        var res = await getListRoom();
        this.rooms = res;
      } catch (error) {
        console.log(error);
      }
    },
    selectRoom(index) {
      this.selectedRoom = index;
      this.menu = true;
    },
    editRoom() {
      // Logic for editing room
    },
    deleteRoom() {
      // Logic for deleting room
    },
    startTimer() {
      // Logic for starting timer
    },
    stopTimer() {
      // Logic for stopping timer
    },
    checkout() {
      // Logic for checkout
    },
    addService() {
      // Logic for adding service
    },

    showCreateRoom() {
      this.isShowCreateRoom = true;
    },
    hideCreateRoom() {
      this.isShowCreateRoom = false;
    },
    async addRoom() {
      const roomType = parseInt(this.newRoom.type, 10);
      const price = parseInt(this.newRoom.price.replace(/,/g, ""), 10);
      var data = {
        numberRoom: this.newRoom.name,
        typeRoom: roomType,
        price: price,
      };
      try {
        await createRoom(data);
        this.$toast.success("Thêm phòng thành công");
        this.fetchListRooom();
        this.hideCreateRoom();
      } catch (e) {
        this.$toast.error("Có lỗi xảy ra");
      }
    },
  },

  computed: {
    dynamicMask() {
      const length = this.newRoom.price.toString().length;
      return "#".repeat(length).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    getAvailableRooms() {
      return this.rooms.filter((room) => room.available).length;
    },
    getUsingRooms() {
      return this.rooms.filter((room) => !room.available).length;
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
