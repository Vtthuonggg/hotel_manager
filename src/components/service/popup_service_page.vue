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
              <v-card
                class="service-card"
                :class="{ selected: isSelected(item) }"
                @click="toggleSelect(item)"
              >
                <v-list-item>
                  <div class="image-container">
                    <v-img
                      :src="item.image"
                      class="service-image"
                      aspect-ratio="1"
                    ></v-img>
                  </div>
                  <v-col>
                    <div class="quantity-container">
                      <v-btn icon @click.stop="decreaseQuantity(item)">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      <v-text-field
                        outlined
                        dense
                        v-model="item.quantity"
                        min="1"
                        class="quantity-input"
                        @keypress="isNumber"
                        @input="filterInput"
                        @click.stop
                      ></v-text-field>
                      <v-btn icon @click.stop="increaseQuantity(item)">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>

                    <div class="info-service">
                      <div class="service-info">
                        <span>{{ item.name }}</span>
                      </div>
                      <div class="service-price">
                        <span
                          >{{
                            formatCurrency(item.price * item.quantity)
                          }}đ</span
                        >
                      </div>
                    </div>
                    <v-divider></v-divider>
                  </v-col>

                  <v-checkbox
                    v-model="item.selected"
                    class="service-checkbox"
                    color="#2da8ff"
                    :disabled="true"
                  ></v-checkbox>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="footer">
        <v-btn
          class="gradient-button-cancel"
          @click="closePopup"
          style="color: #007bff"
          >Hủy</v-btn
        >
        <v-btn
          class="gradient-button-confirm"
          color="primary"
          @click="submitService"
          >Xác nhận</v-btn
        >
      </div>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
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
    idBooking: String,
  },
  created() {
    this.fetchServices();
  },

  data() {
    return {
      loading: false,
      selectedService: [],
      listService: [],
    };
  },
  methods: {
    async submitService() {
      await addServiceBill();
    },
    updateSelectedService(item) {
      const selected = this.selectedService.find(
        (service) => service.id === item.id
      );
      if (selected) {
        selected.quantity = item.quantity;
      }
    },
    increaseQuantity(item) {
      item.quantity++;
      this.updateSelectedService(item);
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateSelectedService(item);
      }
    },
    toggleSelect(item) {
      item.selected = !item.selected;
      if (item.selected) {
        this.selectedService.push({ id: item.id, quantity: item.quantity });
      } else {
        this.selectedService = this.selectedService.filter(
          (service) => service.id !== item.id
        );
      }
    },
    isSelected(item) {
      return this.selectedService.some((service) => service.id === item.id);
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
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    },
    filterInput(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    },
  },
};
</script>
<style scoped>
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
.header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 20;
  padding-bottom: 10px;
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
.service-checkbox {
  position: absolute;
  top: 10px;
  right: 10px;
}
.info-service {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  width: 100%;
}
.service-card.selected {
  border: 2px solid #2da8ff;
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
.quantity-container {
  display: flex;
  margin-top: 10px;
  width: 120px;
}
.quantity-input {
  text-align: center;
  padding: 0;
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
