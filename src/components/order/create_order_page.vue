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
        <v-row class="time-row">
          <v-col>
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
                  v-model="formattedStartDate"
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
          </v-col>
          <v-col>
            <v-text-field
              outlined
              type="time"
              class="custom-input"
              v-model="startTime"
              label="Thời gian bắt đầu"
              prepend-inner-icon="mdi-clock"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="time-row">
          <v-col col="8">
            <v-menu
              ref="endDateMenu"
              v-model="endDateMenu"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formattedEndDate"
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
          </v-col>
          <v-col col="4">
            <v-text-field
              type="time"
              class="custom-input"
              v-model="endTime"
              label="Thời gian kết thúc"
              prepend-inner-icon="mdi-clock"
              dense
              outlined
            ></v-text-field>
          </v-col>
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
      startDate: moment().format("YYYY-MM-DD"),
      startTime: moment().format("HH:mm"),
      endDate: moment().format("YYYY-MM-DD"),
      endTime: moment().format("HH:mm"),
      endDateMenu: false,
      endTimeMenu: false,
      startDateMenu: false,
      startTimeMenu: false,
    };
  },
  computed: {
    formattedStartDate() {
      return moment(this.startDate).format("DD-MM-YYYY");
    },
    formattedEndDate() {
      return moment(this.endDate).format("DD-MM-YYYY");
    },
    totalTime() {
      if (this.startDate && this.startTime && this.endDate && this.endTime) {
        const start = moment(`${this.startDate}T${this.startTime}:00`);
        const end = moment(`${this.endDate}T${this.endTime}:00`);

        const diff = moment.duration(end.diff(start));
        const days = Math.floor(diff.asDays());
        const hours = Math.floor(diff.asHours() % 24);
        const minutes = diff.minutes();

        return `${days} ngày ${hours} giờ ${minutes} phút`;
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
.time-row {
  justify-content: flex-end;
}
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
