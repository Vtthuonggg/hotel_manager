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
          ><i class="fas fa-door-open"></i
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
          <li>
            <router-link to="/settings/info">
              <i class="fa-solid fa-hotel"></i>Cài đặt thông tin</router-link
            >
          </li>
          <li>
            <router-link to="/settings/room-pricing"
              ><i class="fa-solid fa-coins"></i>Cài đặt giá phòng</router-link
            >
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
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      dropdownVisible: false,
    };
  },
  methods: {
    showDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    },
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
  padding-right: 20px;
}
i {
  margin-right: 5px;
  font-size: 20px;
}
.active-link {
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
}

.exact-active-link {
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
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
</style>
