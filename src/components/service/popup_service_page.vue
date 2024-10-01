<template>
  <div v-if="isShowAddSv" class="popup">
    <div class="pop-container">
      <div>
        <span class="close" @click="closePopup">&times;</span>
        <h1 style="margin-bottom: 20px">Chọn dịch vụ</h1>
        <v-divider></v-divider>
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
        <v-overlay :value="loading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </div>
    </div>
  </div>
</template>

<script>
import { getListService } from "@/api/service_api.js";
import { formatCurrency } from "@/utils/format_currency";

export default {
  props: {
    isShowAddSv: Boolean,
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
  overflow: auto;
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
.v-btn {
  min-width: 30px;
  padding: 0;
}
</style>
