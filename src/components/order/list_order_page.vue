<template>
    <div class="container">
    <v-row class="row-title-item">
      <h2>Danh sách đơn hàng</h2>
    </v-row>
    <v-divider></v-divider>
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
          <v-card class="order-card">
            <v-list-item>
              <v-col>
                <div class="info-order">
                  <div class="order-info">
                    <span>ID: {{ item.id }}</span>
                  </div>
                  <div class="order-name">
                    <span>Phòng: {{ item.room.numberRoom }}</span>
                  </div>
                    <div class="order-Timein">
                        <span>Check-in: {{formatDate(item.timeIn)}}</span>
                  </div>
                  <div class="order-Timeout">
                    <span>Check-out: {{item.timeOut ? formatDate(item.timeOut) : `Chưa check-out`}}</span>
                  </div>
                </div>
              </v-col>
              <v-col>
                <div class="status-container">
                <div :class="['status', item.isPaid ? 'paid' : 'unpaid']" >
                    <span>{{ item.isPaid ? `Đã thanh toán `: `Chưa thanh toán`}}</span>
                </div>
                <div class="order-price">
                    <span>{{ item.isPaid ? `${formatCurrency(item.totalPrice)} VNĐ`: ``}}</span>
                  </div>
                </div>
              </v-col>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
</template>
<script>
import { getListOrder } from '@/api/order_api';
import { formatCurrency } from '@/utils/format_currency'; 
import moment from 'moment';
export default {
  data() {
    return {
      loading: false,
      listOrder: []
    };
  },
    created() {
    this.fetchOrderList();
  },
  methods: {
    formatCurrency,
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY HH:mm');
    },
    async fetchOrderList() {
      this.loading = true;
      try {
        var res = await getListOrder();
        this.listOrder = res;
      } catch (error) {
        this.$toast.error("Có lỗi xảy ra");
      }finally{
        this.loading = false;
      }
    }
  }
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
.order-name{
    font-weight: bold ;
    padding: 5px 0px;
}
.order-Timein,
.order-Timeout {
  margin-top: 10px;
    text-align: left;
    font-size: 15px;
    padding-bottom : 5px ;
}
.status {
  margin-top: 10px;;
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

</style>