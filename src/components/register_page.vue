<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" class="logo" />
    <h3 class="name-group">Công ty cổ phần The Seven</h3>

    <div class="register-container">
      <h2>Đăng ký</h2>
      <form @submit.prevent="checkConfirmPassword">
        <div class="form-group">
          <label for="username">Tài khoản:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Nhập lại mật khẩu:</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            required
          />
        </div>
        <button type="submit">Đăng ký</button>
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
      username: "",
      password: "",
      confirmPassword: "",
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
      try {
        await register(this.username, this.password);
      } catch (e) {
        this.$toast.error(e.toString());
      }
    },
  },
};
</script>

<style scoped>
.logo {
  width: 200px;
  height: auto;
  margin-top: 100px;
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
  margin-top: 150px;
}
.login-link {
  max-width: 400px;
  margin: 0 auto;
  text-align: right;
  margin-top: 10px;
}
.form-group {
  text-align: left;
  margin-bottom: 15px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
label {
  display: block;
  margin-bottom: 5px;
}
</style>
