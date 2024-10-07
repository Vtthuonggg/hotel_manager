<template>
  <div v-if="isShowPaymentRoom" class="popup">
    <div class="pop-container">
      <div>
        <span class="close" @click="closePopup">&times;</span>
        <h1 class="hotel-name">{{ detailInvoice.inforHotel.hotelName }}</h1>

        <hr class="dashed-line" />
      </div>
      <div>
        <h1 class="bill">HÓA ĐƠN THANH TOÁN</h1>
        <img :src="qrCodeUrl" alt="QR Code" class="qr-img" />
      </div>
      <h3 style="padding-top: 30px">THÔNG TIN ĐẶT PHÒNG</h3>
      <div class="infor-booking">
        <div>
          <span
            ><b>Phòng: </b><br />{{
              detailInvoice.bookingDto.room.numberRoom
            }}</span
          >
        </div>
        <div>
          <span>
            <b> Giờ check-in: </b>
            <br />{{
              new Date(detailInvoice.bookingDto.timeIn).toLocaleString()
            }}
          </span>
        </div>
        <div>
          <span>
            <b>Giờ check-out: </b>
            <br />{{
              new Date(detailInvoice.bookingDto.timeOut).toLocaleString()
            }}
          </span>
        </div>
        <div>
          <span>
            <b>Tổng giá: </b>
            <br />{{ formatCurrency(detailInvoice.bookingDto.totalPrice) }} VNĐ
          </span>
        </div>
      </div>
      <h3>THÔNG TIN DỊCH VỤ</h3>
      <div class="infor-service">
        <table>
          <thead>
            <tr>
              <th>Tên dịch vụ:</th>
              <th>Đơn giá:</th>
              <th>SL:</th>
              <th>Tổng:</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(servie, index) in detailInvoice.serviceDtoList"
              :key="index"
            >
              <td>{{ servie.nameService }}</td>
              <td>{{ formatCurrency(servie.price) }} VNĐ</td>
              <td>{{ servie.quantity }}</td>
              <td>{{ formatCurrency(servie.amount) }} VNĐ</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr class="dashed-line" />
      <div class="invoice-room">
        <h3>
          TỔNG GIÁ PHÒNG: {{ formatCurrency(detailInvoice.totalAmount) }} VNĐ
        </h3>
      </div>
      <hr class="dashed-line" />
      <div class="infor-hotel">
        {{ detailInvoice.inforHotel.hotelAddress }}
        <br />
        {{ detailInvoice.inforHotel.hotline }}
      </div>
      <div class="confirm-button-container">
        <button @click="confirmPayment" class="confirm-button">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { formatCurrency } from "@/utils/format_currency";
export default {
  props: {
    isShowPaymentRoom: Boolean,
    detailInvoice: Object,
  },
  data() {
    return {
      qrCodeUrl: "",
    };
  },

  mounted() {
    const numberBank = Cookies.get("accountNumber");
    const selectedBank = Cookies.get("selectedBank");
    this.qrCodeUrl = `https://img.vietqr.io/image/${selectedBank}-${numberBank}-qr_only.png?amount=${this.detailInvoice.totalAmount}`;
  },
  methods: {
    confirmPayment() {
      this.closePopup();
    },
    formatCurrency,

    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style>
.pop-container {
  border: #000 1px solid;
  width: 60%;
  background-color: white;
  padding: 30px;
  max-height: 90vh;
  overflow: auto;
}
.dashed-line {
  border: none;
  border-top: 2px dashed #000;
  width: 100%;
  margin: 20px 0;
}
.hotel-name {
  margin-bottom: 30px;
  font-size: 20px;
  font-family: "Times New Roman", Times, serif;
}

.qr-img {
  width: 20%;
}
.infor-booking {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: space-between;
  text-align: left;
}
h3 {
  margin: 10px;
}
.infor-service {
  display: flex;
  justify-content: space-between;
}
.popup {
  width: 100%;
  height: 100%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px;
}

th,
td {
  text-align: center;
}
th {
  padding-bottom: 10px;
}
.confirm-button-container {
  text-align: center;
  margin-top: 20px;
}
.confirm-button {
  background-color: #2da8ff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
.confirm-button:hover {
  background-color: #2da8ff;
}
</style>
