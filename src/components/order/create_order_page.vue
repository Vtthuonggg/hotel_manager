<template>
  <div class="page-container">
    <div class="title">
      <p>
        <router-link to="/dashboard/listroom" class="room-link"
          >Danh sách phòng</router-link
        >
        > {{ title }} > Phòng: {{ room.name }}
      </p>
    </div>
    <v-divider class="custom-divider"></v-divider>
    <div class="content-container">
      <div class="left-pane">
        <v-row>
          <v-menu
            ref="startDateMenu"
            v-model="startDateMenu"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="custom-input"
                v-model="startDate"
                label="Ngày bắt đầu"
                prepend-inner-icon="mdi-calendar-range"
                v-bind="attrs"
                v-on="on"
                dense
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              locale="vi"
              v-model="startDate"
              @input="startDateMenu = false"
              :allowed-dates="allowedDates"
            ></v-date-picker>
          </v-menu>
          <v-menu
            ref="startTimeMenu"
            v-model="startTimeMenu"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                outlined
                class="custom-input"
                v-model="startTime"
                label="Thời gian bắt đầu"
                prepend-inner-icon="mdi-clock"
                readonly
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="startTime"
              @input="startTimeMenu = false"
            ></v-time-picker>
          </v-menu>
        </v-row>
        <v-row>
          <v-menu
            ref="endDateMenu"
            v-model="endDateMenu"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                outlined
                dense
                class="custom-input"
                label="Ngày kết thúc"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              @input="endDateMenu = false"
            ></v-date-picker>
          </v-menu>
          <v-menu
            ref="endTimeMenu"
            v-model="endTimeMenu"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="custom-input"
                v-model="endTime"
                label="Thời gian kết thúc"
                prepend-inner-icon="mdi-clock"
                v-bind="attrs"
                v-on="on"
                dense
                outlined
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="endTime"
              @input="endTimeMenu = false"
            ></v-time-picker>
          </v-menu>
        </v-row>
      </div>
      <div class="vertical-divider"></div>
      <div class="right-pane">
        <v-col>
          <p>Tổng thời gian: {{ totalTime }}</p>
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      title: "",
      room: {},
      startDate: moment().format("DD/MM/YYYY"),
      startTime: moment().format("HH:mm"),
      endDate: moment().format("DD/MM/YYYY"),
      endTime: moment().format("HH:mm"),
      endDateMenu: false,
      endTimeMenu: false,
      startDateMenu: false,
      startTimeMenu: false,
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
      return "";
    },
  },
  created() {
    this.loadData();
    this.updateMetaTitle();
  },
  methods: {
    allowedDates(value) {
      const today = moment(new Date()).format("YYYY-MM-DD");
      if (today <= value) {
        return true;
      } else {
        return false;
      }
    },
    loadData() {
      this.title =
        this.$route.params.title || localStorage.getItem("title") || "Tạo đơn";
      this.room = this.$route.params.detail ||
        JSON.parse(localStorage.getItem("room")) || {
          name: "Phòng chưa xác định",
        };

      localStorage.setItem("title", this.title);
      localStorage.setItem("room", JSON.stringify(this.room));
    },
    updateMetaTitle() {
      if (this.$route.params.title === "Tạo đơn") {
        this.$router.currentRoute.meta.title = "Bate - Tạo đơn";
      } else {
        this.$router.currentRoute.meta.title = "Bate - Sửa đơn";
      }
      document.title = this.$router.currentRoute.meta.title;
    },
  },
};
</script>
<style scoped>
.custom-input {
  max-height: 40px !important;
  border-radius: 10px;
  max-width: 300px;
  margin: 20px !important;
}
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
  height: calc(100vh - 100px);
}
.left-pane {
  margin: 30px;
  flex: 3;
  max-width: 75%;
  background-color: #ffffff;
}
.right-pane {
  flex: 1;
  max-width: 25%;
  background-color: #ffffff;
}
.vertical-divider {
  margin-top: 10px;
  width: 3px;
  background-color: #1db4f0;
  height: 100%;
  display: inline-block;
}
</style>
