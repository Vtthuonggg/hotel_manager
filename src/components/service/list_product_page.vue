<template>
  <div class="container">
    <v-row class="row-title-item">
      <h2>Danh sách dịch vụ</h2>
      <v-btn
        class="gradient-button"
        @click="showCreateService"
        style="color: white"
      >
        <v-icon style="color: white">mdi-plus</v-icon>
        <span>Thêm dịch vụ</span>
      </v-btn>
    </v-row>
    <div v-if="isShowCreateService" class="popup">
      <div class="popup-content">
        <h3>Tạo dịch vụ</h3>
        <v-text-field v-model="newService.name" label="Tên"></v-text-field>
        <v-text-field
          v-model.number="newService.price"
          label="Giá tiền"
          type="number"
        ></v-text-field>
        <div class="button-container">
          <v-btn
            class="gradient-button-cancel"
            style="color: #007bff"
            @click="hideCreateService"
            >Hủy</v-btn
          >
          <v-btn
            class="gradient-button-confirm"
            style="color: white"
            @click="addService"
            >Xác nhận</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowCreateService: false,
      newService: {
        name: "",
        price: null,
      },
      listSevices: [],
    };
  },
  methods: {
    showCreateService() {
      this.isShowCreateService = true;
    },
    hideCreateService() {
      this.isShowCreateService = false;
    },
    async addService() {
      this.listSevices.push(this.newService);
      console.log("New service:", this.newService);
      this.$toast.success("Thêm dịch vụ thành công");
      this.hideCreateService();
    },
    validateInteger(event) {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value)) {
        this.newService.price = value;
      } else {
        this.newService.price = 0;
      }
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
  margin: 4px 2px;
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
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition: background 0.3s ease;
}
.button-container {
  display: flex;
  justify-content: space-between;
}
.container {
  width: 100%;
  flex-direction: column;
  align-items: center;
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
</style>
