<template>
  <div>
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
                    <v-icon v-if="room.typeRoom === 1" large
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
              <v-list style="font-weight: bold" v-if="selectedRoom === index">
                <v-list-item v-if="room.available" @click="startTimer(room.id)">
                  <v-icon>mdi-clock</v-icon>
                  <v-list-item-title>Bắt đầu tính giờ</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="room.available" @click="showEditRooom(room)">
                  <v-icon>mdi-pencil</v-icon>
                  <v-list-item-title>Sửa phòng</v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-if="room.available"
                  @click="showDeleteRoom(room.id)"
                >
                  <v-icon>mdi-close</v-icon>
                  <v-list-item-title>Xóa phòng</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="!room.available" @click="updateOrder(room)">
                  <v-icon>mdi-currency-usd</v-icon>
                  <v-list-item-title>Trả phòng & Thanh toán</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="!room.available" @click="showAddService">
                  <v-icon>mdi-room-service</v-icon>
                  <v-list-item-title>Thêm dịch vụ</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
      <div v-if="isShowCreateRoom || isShowEditRoom" class="popup">
        <div class="popup-content">
          <h3>
            {{
              isShowEditRoom
                ? `Sửa phòng: ${newRoom.numberRoom}`
                : "Tạo phòng mới"
            }}
          </h3>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              v-model="newRoom.numberRoom"
              label="Tên phòng"
              :rules="[(v) => !!v || 'Tên phòng không được để trống']"
            ></v-text-field>
            <v-text-field
              v-model="formattedPrice"
              label="Giá phòng"
              :rules="[(v) => !!v || 'Giá phòng không được để trống']"
              @keydown="filterInput"
              ><template v-slot:append>
                <span>đ</span>
              </template></v-text-field
            >
            <v-radio-group v-model="newRoom.typeRoom" row>
              <v-radio color="#1db4f0" label="Phòng đơn" :value="1"></v-radio>
              <v-radio color="#1db4f0" label="Phòng đôi" :value="2"></v-radio>
            </v-radio-group>
          </v-form>
          <div class="button-container">
            <v-btn
              class="gradient-button-cancel"
              style="color: #007bff"
              @click="hideCreateEditRoom"
              >Hủy</v-btn
            >
            <v-btn
              class="gradient-button-confirm"
              style="color: white"
              @click="validateAndSubmit"
              >Xác nhận</v-btn
            >
          </div>
        </div>
      </div>
      <div v-if="isDeleteRoom" class="popup">
        <div class="popup-content">
          <h3>Xóa phòng</h3>
          <div class="button-container">
            <v-btn
              class="gradient-button-cancel"
              style="color: #007bff"
              @click="hideDeleteRoom"
              >Hủy</v-btn
            >
            <v-btn
              class="gradient-button-confirm"
              style="color: white"
              @click="deletedRoom(roomId)"
              >Xác nhận</v-btn
            >
          </div>
        </div>
      </div>
      <div v-if="isShowPaymentRoom">
        <Invoice
          :detailInvoice="detailInvoice"
          :isShowPaymentRoom="isShowPaymentRoom"
          @closePopup="hidePaymentRoom"
        ></Invoice>
      </div>
      <div v-if="showPopupAddService">
        <PopupAddService
          :isShowAddSv="showPopupAddService"
          @close-popup="hideAddService"
        ></PopupAddService>
      </div>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
  </div>
</template>

<script>
import {
  getListRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from "@/api/room_api.js";
import Invoice from "../invoice_page.vue";
import PopupAddService from "../service/popup_service_page.vue";
import { formatCurrency } from "@/utils/format_currency";
import { createOrder, updateOrder, getListOrder } from "@/api/order_api.js";
import moment from "moment-timezone";
export default {
  components: {
    Invoice,
    PopupAddService,
  },
  data() {
    return {
      formValid: false,
      loading: false,
      showPopupAddService: false,
      roomId: null,
      isShowEditRoom: false,
      selectedRoom: null,
      menu: false,
      isShowCreateRoom: false,
      isShowPaymentRoom: false,
      isDeleteRoom: false,
      listOrder: [],
      newRoom: {
        numberRoom: "",
        typeRoom: 1,
        price: "",
      },

      rooms: [],
      detailInvoice: {
        inforHotel: {
          hotelName: "Viet",
          image:
            "https://res.cloudinary.com/dfxdq0iwq/image/upload/v1726576569/tfievesjykbp8zu8h1yh.jpg",
          hotelAddress: "Ha Noi",
          hotline: "0123445567",
        },
        bookingDto: {
          id: 102,
          room: {
            id: 1,
            numberRoom: 198,
            typeRoom: "Deluxe",
            price: 500000,
            available: false,
          },

          timeIn: "2024-12-12T05:12:12.000+00:00",
          timeOut: "2024-12-14T05:00:00.000+00:00",
          totalPrice: 700000,
          isPaid: true,
        },
        serviceDtoList: [
          {
            id: 1,
            nameService: "coca",
            price: 15000,
            quantity: 2,
            amount: 30000,
          },
          {
            id: 2,
            nameService: "aqua",
            price: 10000,
            quantity: 4,
            amount: 40000,
          },
        ],
        totalAmount: 770000,
      },
    };
  },

  created() {
    this.fetchListRooom();
    this.fetchListOrder();
  },
  methods: {
    async fetchListOrder() {
      try {
        var res = await getListOrder();
        console.log(`list order`, res);
        this.listOrder = res;
      } catch (error) {
        this.$toast.error("Có lỗi xảy ra");
      }
    },
    async updateOrder(room) {
      const order = this.listOrder.find((order) => order.room.id === room.id);
      if (order) {
        const orderId = order.id;
        console.log(`Order ID: ${orderId}`);

        const timeOut = moment()
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss");
        var data = {
          idRoom: room.id.toString(),
          timeIn: "2024-09-28 12:02:05",
          timeOut: timeOut,
          isPaid: true,
        };
        this.loading = true;
        try {
          await updateOrder(data, orderId);
          this.$toast.success("Thanh toán thành công");
        } catch (e) {
          this.$toast.error("Có lỗi xảy ra");
        } finally {
          this.loading = false;
        }
      } else {
        this.$toast.error("Không tìm thấy đơn hàng");
      }
    },

    showEditRooom(room) {
      console.log(room);
      this.newRoom = { ...room };
      this.selectedRoom = null;
      this.isShowEditRoom = true;
    },
    formatCurrency,
    async fetchListRooom() {
      this.loading = true;
      try {
        var res = await getListRoom();
        this.rooms = res;
      } catch (error) {
        this.$toast.error("Có lỗi xảy ra");
      } finally {
        this.loading = false;
      }
    },
    selectRoom(index) {
      this.selectedRoom = index;
      this.menu = true;
    },
    async deletedRoom(id) {
      try {
        await deleteRoom(id);
        this.isDeleteRoom = false;
        this.$toast.success("Xóa thành công");
        this.fetchListRooom();
      } catch (e) {
        this.$toast.error("Có lỗi xảy ra");
      }
    },
    async startTimer(roomId) {
      const timeIn = moment()
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYY-MM-DD HH:mm:ss");
      const data = {
        idRoom: roomId,
        timeIn: timeIn,
        isPaid: false,
      };
      this.loading = true;
      try {
        await createOrder(data);
        this.$toast.success("Tạo đơn thành công");
      } catch (e) {
        this.$toast.error("Có lỗi xảy ra");
      } finally {
        this.loading = false;
      }
    },
    stopTimer() {
      // Logic for stopping timer
    },
    checkout() {
      // Logic for checkout
    },
    showAddService() {
      this.showPopupAddService = true;
      this.menu = false;
    },
    hideAddService() {
      this.showPopupAddService = false;
    },

    showCreateRoom() {
      this.isShowCreateRoom = true;
    },
    showPaymentRoom() {
      this.isShowPaymentRoom = true;
      this.menu = false;
    },
    hidePaymentRoom() {
      this.isShowPaymentRoom = false;
    },
    hideCreateEditRoom() {
      this.isShowCreateRoom = false;
      this.isShowEditRoom = false;
      this.newRoom = { numberRoom: "", typeRoom: 1, price: "" };
    },
    hideDeleteRoom() {
      this.isDeleteRoom = false;
    },
    showDeleteRoom(id) {
      this.isDeleteRoom = true;
      this.roomId = id;
      console.log(id);
    },
    filterInput(event) {
      // Chỉ cho phép các phím số và các phím điều khiển
      const allowedKeys = [
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Tab",
        "Enter",
      ];
      if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    },
    async submit(type) {
      const roomType = parseInt(this.newRoom.typeRoom, 10);
      const price =
        typeof this.newRoom.price === "string"
          ? parseInt(this.newRoom.price.replace(/,/g, ""), 10)
          : this.newRoom.price;
      var data = {
        numberRoom: this.newRoom.numberRoom,
        typeRoom: roomType,
        price: price,
        available: true,
      };
      this.loading = true;
      try {
        if (type == 1) {
          console.log("Tạo");
          await createRoom(data);
          this.$toast.success("Thêm phòng thành công");
        } else {
          console.log("Sửa");
          await updateRoom(this.newRoom.id, data);
          this.$toast.success("Sửa phòng thành công");
        }
        this.fetchListRooom();
        this.hideCreateEditRoom();
      } catch (e) {
        this.$toast.error("Có lỗi xảy ra");
      } finally {
        this.loading = false;
      }
    },
    validateAndSubmit() {
      if (this.$refs.form.validate()) {
        this.submit(this.isShowEditRoom ? 2 : 1);
      }
    },
  },

  computed: {
    formattedPrice: {
      get() {
        return this.newRoom.price !== null
          ? formatCurrency(this.newRoom.price)
          : "";
      },
      set(value) {
        if (typeof value === "string") {
          this.newRoom.price = parseInt(value.replace(/\D/g, ""), 10) || 0;
        } else {
          this.newRoom.price = value;
        }
      },
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
