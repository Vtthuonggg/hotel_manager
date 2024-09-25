<template>
  <div>
    <div>
      <h1 class="hotel-name">{{ detailInvoice.inforHotel.hotelName }}</h1>
      <hr class="dashed-line" />
    </div>
    <div>
      <h1 class="bill">HÓA ĐƠN THANH TOÁN</h1>
      <img :src="qrCodeUrl" alt="QR Code" class="qr-img" />
    </div>
    <h3 style="padding-top: 30px">Thông tin đặt phòng</h3>
    <div class="infor-booking">
      <p><b>Phòng: </b>{{ detailInvoice.bookingDto.room.numberRoom }}</p>
      <p>
        <b> Giờ check-in: </b>
        {{ new Date(detailInvoice.bookingDto.timeIn).toLocaleString() }}
      </p>
      <p>
        <b>Giờ check-out: </b>
        {{ new Date(detailInvoice.bookingDto.timeOut).toLocaleString() }}
      </p>
      <p>
        <b>Tổng giá: </b>
        {{ formatCurrency(detailInvoice.bookingDto.totalPrice) }} VND
      </p>
    </div>
    <h3>Thông tin dịch vụ</h3>
    <div class="infor-service">
      <ul>
        <li v-for="service in detailInvoice.serviceDtoList" :key="service.id">
          <strong>{{ formatCurrency(service.nameService) }}</strong> -
          {{ formatCurrency(service.quantity) }} x
          {{ formatCurrency(service.price) }} VND =
          {{ formatCurrency(service.amount) }} VND
        </li>
      </ul>
    </div>
    <hr class="dashed-line" />
    <div class="invoice-room">
      <h3>
        Tổng giá phòng: {{ formatCurrency(detailInvoice.totalAmount) }} VND
      </h3>
    </div>
    <hr class="dashed-line" />
    <div class="infor-hotel">
      <b>{{ detailInvoice.inforHotel.hotelAddress }}</b
      ><br />
      <b>{{ detailInvoice.inforHotel.hotline }}</b>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { formatCurrency } from "@/utils/format_currency";
export default {
  data() {
    return {
      qrCodeUrl: "",
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
  methods: {
    formatCurrency,
  },
  mounted() {
    this.qrCodeUrl = Cookies.get("qrCodeUrl");
    console.log(this.qrCodeUrl);
  },
};
</script>

<style>
.dashed-line {
  border: none;
  border-top: 2px dashed #000;
  width: 100%;
  margin: 20px 0;
}
.hotel-name {
  margin: 50px;
  padding-bottom: 30px;
  font-family: "Times New Roman", Times, serif;
}
.bill {
  padding: 30px 0 30px 0;
}
.qr-img {
  width: 20%;
}
.infor-booking {
  font-family: Arial, Helvetica, sans-serif;
  padding: 50px 0 50px 0;
  text-align: left;
  margin-left: 42%;
}
.infor-service {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 40%;
  padding-top: 30px;
}
.invoice-room {
  padding: 50px 0 50px 0;
}
.infor-hotel {
  padding: 50px 0 50px 0;
}
</style>