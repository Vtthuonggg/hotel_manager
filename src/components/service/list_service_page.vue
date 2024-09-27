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
    <v-divider></v-divider>
    <v-container v-if="listSevices.length > 0">
      <v-row>
        <v-col
          v-for="(item, index) in listSevices"
          :key="index"
          cols="12"
          sm="6"
          md="6"
          lg="6"
        >
          <v-card class="service-card">
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
              <v-menu offset-y bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="editService(item)">
                    <v-list-item-icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Sửa</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="showDeletePop">
                    <v-list-item-icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Xóa</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="isShowDelete" class="popup">
      <div class="popup-content">
        <h3>Xác nhận xóa dịch vụ</h3>
        <div class="button-container">
          <v-btn
            class="gradient-button-cancel"
            style="color: #00bfff"
            @click="isShowDelete = false"
            >Hủy</v-btn
          >
          <v-btn
            class="gradient-button-confirm"
            style="color: white"
            @click="deleteService(item)"
            >Xác nhận</v-btn
          >
        </div>
      </div>
    </div>
    <div v-if="isShowCreateService || isShowEditService" class="popup">
      <div class="popup-content">
        <h3>{{ isShowCreateService ? "Tạo dịch vụ" : "Sửa dịch vụ" }}</h3>
        <v-text-field v-model="newService.name" label="Tên"></v-text-field>
        <v-text-field
          v-model="formattedPrice"
          label="Giá tiền"
          type="text"
          @input="updatePrice"
        ></v-text-field>
        <div class="image-upload-container">
          <input
            type="file"
            @change="onFileChange"
            ref="fileInput"
            style="display: none"
          />
          <div v-if="newService.image" class="image-preview">
            <img
              :src="newService.image"
              alt="Service Image"
              class="uploaded-image"
            />
            <v-icon class="delete-icon" @click="removeImage">mdi-close</v-icon>
          </div>
          <div v-else>
            <v-icon class="upload-icon" @click="triggerFileInput"
              >mdi-upload</v-icon
            >
            <p class="image-text">Tải ảnh lên</p>
          </div>
        </div>
        <div class="button-container">
          <v-btn
            class="gradient-button-cancel"
            style="color: #00bfff"
            @click="hideCreateEditService"
            >Hủy</v-btn
          >
          <v-btn
            class="gradient-button-confirm"
            style="color: white"
            @click="submitService(isShowCreateService ? 1 : 2)"
            >Xác nhận</v-btn
          >
        </div>
      </div>
    </div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import { formatCurrency } from "@/utils/format_currency";
import {
  uploadImage,
  createService,
  getListService,
  updateService,
  deleteeService,
} from "@/api/service_api.js";
export default {
  data() {
    return {
      loading: false,
      isShowDelete: false,
      isShowEditService: false,
      isShowCreateService: false,
      newService: {
        name: "",
        price: null,
        image: null,
        imageFile: null,
      },
      listSevices: [
        {
          name: "coca",
          price: 1000,
          image:
            "https://www.coca-cola.com/content/dam/onexp/vn/home-image/coca-cola/Coca-Cola_OT%20320ml_VN-EX_Desktop.png",
        },
        {
          name: "coca",
          price: 1000,
          image:
            "https://www.coca-cola.com/content/dam/onexp/vn/home-image/coca-cola/Coca-Cola_OT%20320ml_VN-EX_Desktop.png",
        },
        {
          name: "coca",
          price: 1000,
          image:
            "https://www.coca-cola.com/content/dam/onexp/vn/home-image/coca-cola/Coca-Cola_OT%20320ml_VN-EX_Desktop.png",
        },
      ],
    };
  },
  created() {
    this.fetchListService();
  },
  computed: {
    formattedPrice: {
      get() {
        return this.newService.price !== null
          ? formatCurrency(this.newService.price)
          : "";
      },
      set(value) {
        if (typeof value === "string") {
          this.newService.price = parseInt(value.replace(/\D/g, ""), 10) || 0;
        } else {
          this.newService.price = value;
        }
      },
    },
  },
  methods: {
    showDeletePop() {
      this.isShowDelete = true;
    },

    async deleteService(item) {
      this.loading = true;
      try {
        await deleteeService(item.id);
        this.$toast.success("Xóa dịch vụ thành công");
        this.isShowDelete = false;
        this.fetchListService();
      } catch (e) {
        this.$toast.error("Có lỗi xảy ra");
      } finally {
        this.loading = false;
      }
    },

    async fetchListService() {
      this.loading = true;
      try {
        var res = await getListService();
        this.listSevices = res;
      } catch (e) {
        this.$toast.error("Có lỗi xảy ra");
      } finally {
        this.loading = false;
      }
    },
    formatCurrency,
    updatePrice(event) {
      if (event && event.target && event.target.value !== undefined) {
        const value = event.target.value.replace(/\D/g, "");
        this.newService.price = parseInt(value, 10) || 0;
      }
    },
    showCreateService() {
      this.isShowCreateService = true;
    },
    hideCreateEditService() {
      this.isShowCreateService = false;
      this.isShowEditService = false;
      this.newService = {};
    },
    async submitService(type) {
      var data = {
        name: this.newService.name,
        price: this.newService.price,
        image: null,
      };
      this.loading = true;
      try {
        if (this.newService.imageFile) {
          const imageUrl = await uploadImage(this.newService.imageFile);
          this.newService.image = imageUrl;
          data.image = imageUrl;
        }
        if (type == 1) {
          await createService(data);
          this.$toast.success("Thêm dịch vụ thành công");
        } else {
          await updateService(data, this.newService.id);
          this.$toast.success("Sửa dịch vụ thành công");
        }
        this.newService = {};
        this.fetchListService();
        this.hideCreateEditService();
      } catch (error) {
        this.$toast.error("Có lỗi xảy ra");
        return;
      } finally {
        this.loading = false;
      }
    },

    validateInteger(event) {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value)) {
        this.newService.price = value;
      } else {
        this.newService.price = 0;
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          this.$toast.error("Vui lòng chọn một file ảnh hợp lệ.");
          return;
        }
        this.newService.imageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newService.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    removeImage() {
      this.newService.image = null;
      this.newService.imageFile = null;
      this.$refs.fileInput.value = null;
    },
    editService(item) {
      this.newService = { ...item };
      this.isShowEditService = true;
    },
  },
};
</script>
<style scoped>
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
}

.service-price {
  text-align: right;
}
.image-upload-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.image-text {
  font-weight: bold;
  margin-bottom: 20px;
}
.upload-icon {
  font-size: 48px !important;
  color: #00bfff !important;
}

.image-preview {
  position: relative;
  display: inline-block;
}

.uploaded-image {
  max-width: 100%;
  height: auto;
}

.delete-icon {
  position: absolute !important;
  top: 8px;
  right: 8px;
  font-size: 24px;
  cursor: pointer;
  background: white;
  border-radius: 50%;
}
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
  width: 350px;
}
.row-title-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
