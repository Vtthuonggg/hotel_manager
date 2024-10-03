<template>
  <div>
    <div class="container">
      <v-row class="row-title-item">
        <h2>Danh sách đơn hàng</h2>
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
                  <span>Tổng số đơn</span>
                </div>
                <v-divider></v-divider>
                <span class="count">{{ report.totalBooking }}</span>
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
                  <span>Tổng doanh thu</span>
                </div>
                <v-divider></v-divider>

                <span class="count">{{ formatCurrency(report.revenue) }}</span>
              </v-col>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-container v-if="listOrder.length > 0">
        <v-row>
          <v-col
            v-for="(item, index) in listOrder"
            :key="index"
            cols="12"
            sm="6"
            md="6"
            lg="6"
          >
            <v-card class="order-card" @click="showDetailOrder(item)">
              <v-list-item>
                <v-col>
                  <div class="info-order">
                    <div class="order-info">
                      <span>ID: {{ item.bookingDto.id }}</span>
                    </div>
                    <div class="order-name">
                      <span>Phòng: {{ item.bookingDto.room.numberRoom }}</span>
                    </div>
                    <div class="order-Timein">
                      <span
                        >Check-in:
                        {{ formatDate(item.bookingDto.timeIn) }}</span
                      >
                    </div>
                    <div class="order-Timeout">
                      <span
                        >Check-out:
                        {{
                          item.bookingDto.timeOut
                            ? formatDate(item.bookingDto.timeOut)
                            : `Chưa check-out`
                        }}</span
                      >
                    </div>
                  </div>
                </v-col>
                <v-col>
                  <div class="status-container">
                    <div
                      :class="[
                        'status',
                        item.bookingDto.isPaid ? 'paid' : 'unpaid',
                      ]"
                    >
                      <span>{{
                        item.bookingDto.isPaid
                          ? `Đã thanh toán `
                          : `Chưa thanh toán`
                      }}</span>
                    </div>
                    <div class="order-price">
                      <span>{{
                        item.bookingDto.isPaid
                          ? `${formatCurrency(item.totalAmount)} VNĐ`
                          : ``
                      }}</span>
                    </div>
                  </div>
                </v-col>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div v-if="isShowInvoice" class="popup">
        <Invoice
          :detailInvoice="selectedOrder"
          :isShowPaymentRoom="isShowInvoice"
          @closePopup="hidePaymentRoom"
        ></Invoice>
      </div>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
  </div>
</template>
<script>
import Invoice from "../invoice_page.vue";
import { getListBill } from "@/api/invoice_api";
import { formatCurrency } from "@/utils/format_currency";
import moment from "moment";
import { getReport } from "@/api/report_api";
export default {
  components: {
    Invoice,
  },
  data() {
    return {
      report: null,
      isShowInvoice: false,
      selectedOrder: null,
      loading: false,
      listOrder: [],
    };
  },
  created() {
    this.fetchOrderList();
  },
  methods: {
    async fetchReport() {
      this.loading = true;
      try {
        var res = await getReport();
        this.report = res;
      } catch (error) {
        this.$toast.error("Có lỗi xảy ra");
      } finally {
        this.loading = false;
      }
    },
    hidePaymentRoom() {
      this.isShowInvoice = false;
    },
    showDetailOrder(order) {
      this.selectedOrder = order;
      this.isShowInvoice = true;
    },
    formatCurrency,
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm");
    },
    async fetchOrderList() {
      this.loading = true;
      try {
        var res = await getListBill();
        this.listOrder = res;
      } catch (error) {
        this.$toast.error("Có lỗi xảy ra");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
.row-title-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}
.order-card {
  margin-top: 10px;
  align-items: left;
}
.info-order {
  text-align: left;
}
.order-info,
.order-name {
  font-weight: bold;
  padding: 5px 0px;
}
.order-Timein,
.order-Timeout {
  margin-top: 10px;
  text-align: left;
  font-size: 15px;
  padding-bottom: 5px;
}
.status {
  margin-top: 10px;
  color: white;
  border-radius: 5px;
  padding: 7px;
  display: inline-block;
  text-align: right;
}
.paid {
  background-color: rgb(21, 227, 21);
}
.unpaid {
  background-color: red;
}
.order-price {
  margin-top: 10px;
}
.status-container {
  text-align: right;
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

.count {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
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
  height: auto;
  margin-bottom: 20px;
  border-radius: 0 0 15px 15px !important;
}
.empty-text {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  width: 100%;
  font-size: 20px;
}
</style>
