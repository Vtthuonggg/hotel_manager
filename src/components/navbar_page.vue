<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li class="nav-image">
        <img src="../assets/logo.png" alt="Vue logo" class="logo" />
      </li>
      <li class="navbar-item">
        <router-link to="/listroom"><i class="fas fa-door-open"></i><span class="bold-text"></span>PHÒNG</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/reports"> <i class="fas fa-chart-bar"></i><span class="bold-text"></span>BÁO CÁO</router-link>
      </li>
      <v-navigation-drawer
      style="z-index: 1001"
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <template v-slot:prepend>
        <v-list dense style="min-width: 250px !important">
          <v-row class="mx-3 my-0">
            <v-col cols="12" class="pb-1"
            >
              <div class="black--text fs-13">Chào ông / bà</div>
            </v-col
            >
            <v-col cols="12" class="pt-0">
              <div class="primary--text fs-16">
                {{ username }}
              </div>
            </v-col>
          </v-row>
          <v-divider class="primary"></v-divider>
          <v-list-item @click="toggleChangePass" class="d-flex align-center">
            <v-list-item-icon class="mx-0">
              <v-icon size="23">mdi-lock-reset</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-1">Đổi mật khẩu</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout" class="d-flex align-center">
            <v-list-item-icon class="mx-0">
              <v-icon size="23">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-1">Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      showSettingsMenu: false,
    };
  },
  methods: {
    toggleSettingsMenu() {
      this.showSettingsMenu = !this.showSettingsMenu;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showSettingsMenu = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
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
}
i {
  margin-right: 5px;
  font-size: 22px;
}
.settings-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.settings-menu li {
  margin: 10;
}

.settings-menu li a {
  padding: 10px;
  display: block;
  text-decoration: none;
  color: #333;
  font-weight: normal;
}

.settings-menu li a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* Show menu when `showSettingsMenu` is true */
.navbar-item1 .settings-menu {
  display: block;
}
</style>
