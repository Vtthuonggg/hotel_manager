<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" class="logo" />
    <h3 class="name-group">Công ty cổ phần The Seven</h3>

    <div class="login-container">
      <h2>Đăng nhập</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Tài khoản:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
    <div class="register-link">
      <router-link to="/register">Đăng ký tài khoản</router-link>
    </div>
  </div>
</template>

<script>
import { login } from "../api/login_api.js";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      console.log("Username:", this.username);
      console.log("Password:", this.password);

      try {
        await login(this.username, this.password);
        this.$toast.success("Đăng nhập thành công");
      } catch (error) {
        this.$toast.error(error.toString());
      }
      this.$router.push("/dashboard");
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
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 150px;
}

.form-group {
  text-align: left;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
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
.register-link {
  max-width: 400px;
  margin: 0 auto;
  text-align: right;
  margin-top: 10px;
}
</style>
