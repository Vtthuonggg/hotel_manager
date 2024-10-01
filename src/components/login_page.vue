<template>
  <div class="page-container">
    <div class="content-wrap">
      <img alt="Vue logo" src="../assets/logo.png" class="logo" />
      <h3 class="name-group">Quản lý khách sạn</h3>
      <div class="login-container">
        <h2>Đăng nhập</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Tài khoản:</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu:</label>
            <v-text-field
              outlined
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="togglePasswordVisibility"
              dense
              class="password-field"
            ></v-text-field>
          </div>
          <button type="submit" class="gradient-button">Đăng nhập</button>
        </form>
      </div>
      <div class="register-link">
        <router-link to="/register">Đăng ký tài khoản</router-link>
      </div>

      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <FooterPage />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { login } from "../api/login_api.js";
import FooterPage from "./footer_page.vue";

export default {
  components: {
    FooterPage,
  },
  data() {
    return {
      loading: false,
      username: "",
      password: "",
      showPassword: false,
    };
  },

  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        var res = await login(this.username, this.password);
        Cookies.set("accountId", res.accountId, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        this.$toast.success("Đăng nhập thành công");
        this.$router.push("/dashboard");
      } catch (error) {
        this.$toast.error("Tài khoản mật khẩu không chính xác");
      } finally {
        this.loading = false;
      }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrap {
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  width: 10%;
  height: auto;
  margin-top: 5%;
}

.name-group {
  margin-top: 10px;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 5%;
  border-radius: 12px;
}

.form-group {
  text-align: left;
  margin-bottom: 15px;
}
input:focus {
  border-color: #0056b3;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
}
label {
  display: block;
  margin-bottom: 5px;
}

input {
  border-radius: 12px;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
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
.register-link {
  max-width: 400px;
  margin: 0 auto;
  text-align: right;
  margin-top: 10px;
}
.register-link a {
  color: rgb(0, 123, 255);
}

.password-group {
  position: relative;
}

input[type="password"],
input[type="text"] {
  width: 100%;
  padding-right: 40px; /* Thêm khoảng trống cho icon */
}

.password-field {
  border-radius: 12px;
}
</style>
