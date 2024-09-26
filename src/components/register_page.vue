<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" class="logo" />
    <h3 class="name-group">Quản lý khách sạn</h3>

    <div class="register-container">
      <h2>Đăng ký</h2>
      <form @submit.prevent="checkConfirmPassword">
        <div class="form-group">
          <label for="email">Tài khoản:</label>
          <input type="text" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="username">Tên:</label>
          <input type="text" id="username" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="phone">Số điện thoại:</label>
          <input type="text" id="phone" v-model="phone" required />
        </div>
        <div class="form-group">
          <label for="address">Địa chỉ:</label>
          <input type="text" id="address" v-model="address" required />
        </div>
        <div class="form-group">
      <label for="password">Mật khẩu:</label>
      <v-text-field
      outlined
        :type="showPassword ? 'text':'password'" 
        id="password"
        v-model="password"
        required
        :prepend-inner-icon="showPassword ?'mdi-eye':'mdi-eye-off' "
        @click:prepend-inner="togglePasswordVisibility"
      dense
      class="password-field"
      ></v-text-field>
    </div>
    <div class="form-group">
      <label for="confirm-password">Nhập lại mật khẩu:</label>
      <v-text-field
      outlined
      :type="showPassword ? 'text':'password' " 
        id="confirm-password"
        v-model="confirmPassword"
        required
        :prepend-inner-icon="showPassword ?'mdi-eye':'mdi-eye-off' "
        @click:prepend-inner="togglePasswordVisibility"
       dense
      class="password-field"
      ></v-text-field>
    </div>
        <button type="submit" class="gradient-button">Đăng ký</button>
      </form>
    </div>
    <div class="login-link">
      <router-link to="/login">Trở lại đăng nhập</router-link>
    </div>
  </div>
</template>

<script>
import { register } from "../api/login_api.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      confirmPassword: "",
      showPassword: false, 
      showConfirmPassword: false,
    };
  },

  methods: {
    checkConfirmPassword() {
      if (this.password !== this.confirmPassword) {
        this.$toast.warning("Xác nhận mật khẩu chưa đúng");
      } else {
        this.handleRegister();
      }
    },

    async handleRegister() {
      const data = {
        email: this.email,
        password: this.password,
        name: this.name,
        phone: this.phone,
        address: this.address,
      };
      console.log(data);
      try {
        await register(data);
        this.$toast.success("Đăng ký thành công");
        this.$router.push("/login");
      } catch (e) {
        this.$toast.error(e.toString());
      }
    }, togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    // Chuyển đổi trạng thái hiển thị mật khẩu xác nhận
    
  },
};
</script>

<style scoped>
.logo {
  width: 10%;
  height: auto;
  margin-top: 5%;
}

.name-group {
  margin-top: 10px;
}
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 2%;
  border-radius: 12px;
}
input:focus {
  border-color: #0056b3;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
}
.login-link {
  max-width: 400px;
  margin: 0 auto;
  text-align: right;
  margin-top: 10px;
  margin-bottom: 50px

}
.login-link a {
  color: blue;
}
.form-group {
  text-align: left;
  margin-bottom: 15px;
  width: 100%;
}
.gradient-button {
  width: 100%;
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

.gradient-button:hover {
  background: linear-gradient(45deg, #0056b3, #0099cc);
}
input {
  border-radius: 12px;

  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
label {
  display: block;
  margin-bottom: 5px;
}.password-group {
  position: relative;
}

input[type="password"],
input[type="text"] {
  width: 100%;
  padding-right: 40px; 
}

.password-field{
  border-radius: 12px;
}


</style>
