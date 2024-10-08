<template>
  <div v-if="isShowAddSv" class="popup">
    <div class="pop-container">
      <div class="header">
        <span class="close" @click="closePopup">&times;</span>
        <h1>Chọn dịch vụ</h1>
        <v-divider></v-divider>
      </div>
      <div class="content">
        <v-container v-if="listService.length > 0">
          <v-row>
            <v-col
              v-for="(item, index) in listService"
              :key="index"
              cols="12"
              sm="6"
              md="6"
              lg="6"
            >
              <v-card @click="toggleSelect(item)">
                <v-list-item>
                  <div class="image-container">
                    <v-img
                      :src="item.image"
                      class="service-image"
                      aspect-ratio="1"
                    ></v-img>
                  </div>
                  <v-col>
                    <div class="info-service">
                      <div class="service-info">
                        <span>{{ item.name }}</span>
                      </div>
                      <div class="service-price">
                        <span>{{ formatCurrency(item.price) }}đ</span>
                      </div>
                    </div>
                    <v-divider></v-divider>
                  </v-col>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-if="selectedService" class="detail-popup">
      <div class="detail-container">
        <div class="detail-content">
          <h2>{{ selectedService.name }}</h2>
          <v-img
            :src="selectedService.image"
            class="detail-image"
            aspect-ratio="1"
          ></v-img>
          <div class="quantity-container">
            <v-btn icon @click="decreaseQuantity">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-text-field
              v-model="selectedService.quantity"
              min="1"
              class="quantity-input"
              @keydown="isNumber"
            ></v-text-field>
            <div class="quantity-buttons">
              <v-btn icon @click="increaseQuantity">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="detail-footer">
          <v-btn class="gradient-button-cancel" @click="closeDetailPopup"
            >Hủy</v-btn
          >
          <v-btn
            class="gradient-button-confirm"
            color="primary"
            @click="confirmDetail"
            >Xác nhận</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getListService } from "@/api/service_api.js";
import { formatCurrency } from "@/utils/format_currency";
import { addServiceBill } from "@/api/invoice_api.js";
export default {
  props: {
    isShowAddSv: Boolean,
    idBooking: Number,
  },
  created() {
    this.fetchServices();
  },

  data() {
    return {
      selectedService: null,
      loading: false,
      listService: [],
    };
  },
  methods: {

    increaseQuantity() {
      this.selectedService.quantity++;
    },
    decreaseQuantity() {
      if (this.selectedService.quantity > 1) {
        this.selectedService.quantity--;
      }
    },
    async confirmDetail() {
      var data = {
        idBooking: this.idBooking,
        idService: this.selectedService.id,
        quantity: this.selectedService.quantity,
      };
      this.loading = true;
      try {
          await addServiceBill(data);
          this.$toast.success("Thêm dịch vụ thành công");
        this.closeDetailPopup();
      } catch (error) {
        this.$toast.error("Có lỗi xảy ra");
      } finally {
        this.loading = false;
      }
    },

    toggleSelect(item) {
      this.selectedService = { ...item };
    },
    closeDetailPopup() {
      this.selectedService = null;
    },
    formatCurrency,
    closePopup() {
      this.$emit("close-popup");
    },
    async fetchServices() {
      this.loading = true;
      try {
        const response = await getListService();
        this.listService = response.map((service) => ({
          ...service,
          quantity: 1,
        }));
      } catch (error) {
        this.$toast.error("Có lỗi xảy ra");
      } finally {
        this.loading = false;
      }
    },
    isNumber(event) {
      const charCode = event.charCode ? event.charCode : event.keyCode;
      if (
        (charCode < 48 || charCode > 57) &&
        charCode !== 8 &&
        charCode !== 46 &&
        (charCode < 37 || charCode > 40) &&
        charCode !== 9
      ) {
        event.preventDefault();
      }
    },
  },
};
</script>
<style scoped>
.detail-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 30;
}
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.detail-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
}
.quantity-container {
  display: flex;
  align-items: center;
}
.quantity-input {
  max-width: 50px;
  margin: 0 10px;
}
.quantity-buttons {
  display: flex;
  justify-content: space-between;
  width: 100px;
  margin-top: 10px;
}
.detail-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}
.popup {
  width: 100%;
  height: 100%;
}
.pop-container {
  border: #000 1px solid;
  width: 60%;
  background-color: white;
  padding: 30px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
}

.footer {
  position: sticky;
  bottom: 0;
  background-color: white !important;
  z-index: 20;
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.content {
  max-height: calc(90vh - 100px);
  overflow-y: auto;
  z-index: 5;
}

.info-service {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  width: 100%;
}

.service-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.image-container {
  width: 120px;
  height: 120px;
  overflow: hidden;
  margin: 10px;
}
.service-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.service-info {
  flex: 1;
  text-align: left;
  user-select: none;
}
.service-price {
  user-select: none;
  text-align: right;
}

.gradient-button-cancel {
  flex: 1;
  border: none;

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
</style>
