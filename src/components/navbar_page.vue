<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li class="nav-image">
        <img src="../assets/logo.png" alt="Vue logo" class="logo" />
      </li>
      <li class="navbar-item">
        <router-link
          to="/dashboard/listroom"
          active-class="active-link"
          exact-active-class="exact-active-link"
        >
          <i class="fas fa-door-open"></i
          ><span class="bold-text"></span>Phòng</router-link
        >
      </li>
      <li class="navbar-item">
        <router-link
          to="/dashboard/report"
          active-class="active-link"
          exact-active-class="exact-active-link"
        >
          <i class="fas fa-chart-bar"></i><span class="bold-text"></span>Báo
          cáo</router-link
        >
      </li>
      <li class="navbar-item">
        <router-link
          to="/dashboard/service"
          active-class="active-link"
          exact-active-class="exact-active-link"
        >
          <v-icon style="color: black">mdi-food</v-icon
          ><span class="bold-text"></span>Dịch vụ</router-link
        >
      </li>
      <li
        class="navbar-item1 dropdown"
        @mouseover="showDropdown"
        @mouseleave="hideDropdown"
      >
        <a href="#" class="dropdown-toggle">
          <i class="fas fa-cog"></i>
          <span class="bold-text">Cài đặt</span>
        </a>
        <ul class="dropdown-menu" v-if="dropdownVisible">
          <li @click="showInputInfo">
            <a href="#"><i class="fa-solid fa-hotel"></i>Cài đặt thông tin</a>
          </li>
          <li @click="showPriceModal">
            <a href="#"> <i class="fa-solid fa-coins"></i>Cài đặt giá phòng</a>
          </li>
          <li class="logout-item">
            <router-link to="/login"
              ><i class="fa-solid fa-right-from-bracket"></i>Đăng
              xuất</router-link
            >
          </li>
        </ul>
      </li>
    </ul>
    <div v-if="isPriceModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="hidePriceModal">&times;</span>
        <h2 class="title">Cài đặt giá phòng</h2>
        <div class="price-setting">
          <label for="single-room">Phòng đơn:</label>
          <input
            type="number"
            id="single-room"
            v-model="formattedSingleRoomPrice"
          />
        </div>
        <div class="price-setting">
          <label for="double-room">Phòng đôi:</label>
          <input
            type="number"
            id="double-room"
            v-model="formattedDoubleRoomPrice"
          />
        </div>
        <button class="save-button" @click="savePrices">Lưu</button>
      </div>
    </div>
    <div v-if="isInputInfo" class="form-container">
      <form>
        <v-row>
          <div class="logo">
            <img alt="Vue logo" src="../assets/logo.png" class="logo" />
          </div>
          <v-spacer></v-spacer>
          <span class="close" @click="hideInputInfo">&times;</span></v-row
        >
        <div class="avatar-container">
      <input type="file" @change="onFileChange" class="file-input"  ref="fileInput"/>
      <div class="avatar" @click="triggerFileInput">
        <div  v-if="info.avatar">
        <img :src="info.avatar" alt="Avatar" />
       
      </div>

        <v-icon v-else class="upload-icon" >mdi-upload</v-icon>
        
      </div>
    </div>
        <div>
          <label for="name">Tên khách sạn:</label>
          <input type="text" id="name" v-model="info.name" />
        </div>
        <div>
          <label for="phone">Hotline:</label>
          <input type="text" id="phone" v-model="info.phone" />
        </div>
        <div>
          <label for="address">Địa chỉ:</label>
          <input type="text" id="address" v-model="info.address" />
        </div>
        <div>
          <button class="save-button" @click="saveInfo">Lưu</button>
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import { formatCurrency } from "@/utils/format_currency";
import Cookies from "js-cookie";
import { uploadImage } from "@/api/service_api.js";
export default {
  name: "AppNavbar",
  data() {
    return {
      dropdownVisible: false,
      isInputInfo: false,
      isPriceModalVisible: false,
      roomPrice: {
        singleRoomPrice: "",
        doubleRoomPrice: "",
        tripleRoomPrice: "",
        quadRoomPrice: "",
      },
      info: {
        name: "",
        phone: "",
        address: "",
        avatar: "", 
        avatarFile: null,
      },
    };
  },
  // created() {
  //   this.fetchHotelInfo();
  // },
  methods: {
  
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        // Kiểm tra loại MIME của file
        if (!file.type.startsWith('image/')) {
          this.$toast.error("Vui lòng chọn một file ảnh hợp lệ.");
          return;
        }
        this.info.avatarFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.info.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    showDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    },
    showPriceModal() {
      const singleRoomPrice = Cookies.get("singleRoomPrice", );
      const doubleRoomPrice = Cookies.get("doubleRoomPrice");
      if (singleRoomPrice) {
        this.roomPrice.singleRoomPrice = parseInt(singleRoomPrice, 10);
      }
      if (doubleRoomPrice) {
        this.roomPrice.doubleRoomPrice = parseInt(doubleRoomPrice, 10);
      }
      this.isPriceModalVisible = true;
    },
    hidePriceModal() {
      this.isPriceModalVisible = false;
    },
    showInputInfo() {
      this.isInputInfo = true;
    },
    hideInputInfo() {
      this.isInputInfo = false;
    },
    savePrices() {
      Cookies.set("singleRoomPrice", this.roomPrice.singleRoomPrice,{ expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set("doubleRoomPrice", this.roomPrice.doubleRoomPrice,{ expires: 7, secure: true, sameSite: 'Strict' });
      this.$toast.success("Lưu giá phòng thành công");
      this.hidePriceModal();
    },
  async  saveInfo() {
      if (this.info.avatar) {
        try {
          // Tải ảnh lên dịch vụ lưu trữ và lấy URL
          const imageUrl = await uploadImage(this.info.avatarFile);
          this.info.avatar = imageUrl;
          console.log("Uploaded image URL:", imageUrl);
          this.$toast.success("Lưu thông tin thành công");
        } catch (error) {
          console.error("Error uploading image:", error);
          this.$toast.error("Tải ảnh lên thất bại");
          return;
        }
      }


      
      this.hideInputInfo();
    },
    // async fetchHotelInfo() {
    //   try {
    //     const response = await axios.get(`${BASE_URL}hotel/info`);
    //     this.info = response.data;
    //   } catch (error) {
    //     console.error("Error fetching hotel info:", error);
    //   }
    // },
  },  computed :{
    formattedSingleRoomPrice: {
      get() {
        return this.roomPrice.singleRoomPrice !== null
          ? formatCurrency(this.roomPrice.singleRoomPrice)
          : "";
      },
      set(value) {
        if (typeof value === "string") {
          this.roomPrice.singleRoomPrice = parseInt(value.replace(/\D/g, ""), 10) || 0;
        } else {
          this.roomPrice.singleRoomPrice = value;
        }
      },
    },
    formattedDoubleRoomPrice: {
      get() {
        return this.roomPrice.doubleRoomPrice !== null
          ? formatCurrency(this.roomPrice.doubleRoomPrice)
          : "";
      },
      set(value) {
        if (typeof value === "string") {
          this.roomPrice.doubleRoomPrice = parseInt(value.replace(/\D/g, ""), 10) || 0;
        } else {
          this.roomPrice.doubleRoomPrice = value;
        }
      },
    },
  }
};
</script>

<style scoped>

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center ;
  margin-bottom: 10px;
}

.file-input {
  display: none;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar i {
 
  font-size: 
  40px;
  color: #888;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  margin-bottom: 20px;
}
.save-button {
  width: 100%;
  background-color: #007bff; 
  color: white; 
  border: none; 
  padding: 10px 20px;
  font-size: 16px; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s ease; 
}

.save-button:hover {
  background-color: #0056b3; 
}
.navbar {
  background-color: white;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.navbar-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.navbar-item {
  margin-right: 20px;
}

.navbar-item a {
  color: #333;
  text-decoration: none;
  padding: 10px;
  display: block;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
  font-weight: bold;
  font-size: 20px;
}
.navbar-item1 a {
  color: #333;
  text-decoration: none;
  padding: 10px;
  display: block;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
  font-weight: bold;
  font-size: 20px;
}
.navbar-item1 {
  margin-left: auto;
  padding-right: 20px;
}

.settings-link {
  color: #333;
  text-decoration: none;
  padding: 10px;
  display: block;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.navbar-item a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.navbar-item1 a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.logo {
  margin-left: 10px;
  width: 100px;
  height: auto;
  padding-right: 20px;
}
i {
  margin-right: 5px;
  font-size: 20px;
}
.active-link {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgb(0, 157, 255) !important;
}

.exact-active-link {
  background-color: rgba(0, 0, 0, 0.1);
  color: #1db4f0 !important;
}
.active-link i,
.exact-active-link i {
  color: #1db4f0 !important;
}
.logout-item a {
  color: red !important;
}
.dropdown {
  position: relative;
}

.dropdown-menu {
  width: 300px;
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 10px 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1000;
  text-align: left;
}

.dropdown-menu li {
  padding: 10px 20px;
}

.dropdown-menu li a {
  text-decoration: none;
  color: #333;
  font-size: 15px;
  display: block;
}

.dropdown-menu li a:hover {
  background-color: #f0f0f0;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 300px;
  border-radius: 10px;
  margin-top: 10px;
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
.price-setting {
  display: flex;
  margin-bottom: 15px;
}
.price-setting label {
  margin-top: 10px;
  display: inline-block;
  width: 100px;
  margin-right: 10px;
}
.price-setting input {
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 5px;
  flex: 1;
}
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.logo img {
  max-width: 100px;
  margin-bottom: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

form {
  text-align: left;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  display: grid;
  gap: 15px;
  font-family: "Roboto", sans-serif;
}

label {
  font-weight: 500;
  font-size: 1rem;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9fafb;
  transition: border-color 0.3s;
}
input:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
}

button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}
button:active {
  transform: translateY(0);
}
</style>
