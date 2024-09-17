<template>
  <div class="page-container">
  <div class="title">
    <p>
      <router-link to="/dashboard/listroom" class="room-link">Danh sách phòng</router-link> > {{ title }} > Phòng: {{ room.name }}
    </p>
  </div>
  <v-divider  class="custom-divider"></v-divider>
  <div class="content-container">
      <div class="left-pane">
        <v-row>
          <v-col>
            <v-text-field class="input-time"
              v-model="startTime"
              label="Thời gian bắt đầu"
              type="time"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field class="input-time"
              v-model="endTime"
              label="Thời gian kết thúc"
              type="time"
            ></v-text-field>
          </v-col>
          <v-col>
            <p>Tổng thời gian: {{ totalTime }}</p>
          </v-col>
        </v-row>
      </div>
      <div class="vertical-divider"></div>
      <div class="right-pane">
        <!-- Nội dung bên phải -->
      </div>
    </div>



</div>
</template>

<script>
export default {
  data() {
    
    return {title: '',
    room: {},
    startTime: '',
    endTime: '',
  };
  },
  computed: {
    totalTime() {
      if (this.startTime && this.endTime) {
        const start = new Date(`1970-01-01T${this.startTime}:00`);
        const end = new Date(`1970-01-01T${this.endTime}:00`);
        const diff = (end - start) / 1000 / 60; 
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours} giờ ${minutes} phút`;
      }
      return '';
    },
  },
  created(){
    this.loadData();
    this.updateMetaTitle();
  },
  methods: {
    loadData() {
      this.title = this.$route.params.title || localStorage.getItem('title') || 'Tạo đơn';
      this.room = this.$route.params.detail || JSON.parse(localStorage.getItem('room')) || { name: 'Phòng chưa xác định' };

      localStorage.setItem('title', this.title);
      localStorage.setItem('room', JSON.stringify(this.room));
    },
    updateMetaTitle() {
      if (this.$route.params.title === 'Tạo đơn') {
        this.$router.currentRoute.meta.title = 'Bate - Tạo đơn';
      } else {
        this.$router.currentRoute.meta.title = 'Bate - Sửa đơn';
      }
      document.title = this.$router.currentRoute.meta.title;
    },
  },
};
</script>
<style scoped>
.page-container {
  width: 100%;
}
.room-link {
  text-decoration: none; 
  color: #1db4f0; 
}
.title {
  font-size: 20px;
  display: flex;
  align-items: center;
  margin: 30px 0px 20px 20px;
}

.custom-divider {
  border-width: 2px; 
  background-color: #1db4f0; 
}
.content-container {
  display: flex;
  height: calc(100vh - 100px); /* Adjust height as needed */
}
.left-pane {
  flex: 3;
  max-width: 75%;
  background-color: #f0f0f0; /* Màu nền cho phần bên trái */
}
.right-pane {
  flex: 1;
  max-width: 25%;
  background-color: #ffffff; /* Màu nền cho phần bên phải */
}
.vertical-divider {
  margin-top:10px ;
  width: 3px;
  background-color: #1db4f0;
  height: 100%;
  display: inline-block;
}
</style>