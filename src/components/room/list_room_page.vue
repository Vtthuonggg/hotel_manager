<template>
    <div>


        <h1>Danh sách phòng</h1>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" md="4" v-for="room in rooms" :key="room.id">
          <v-card>
          
            <v-card-title>
              <h3>{{ room.name }}</h3>
            </v-card-title>
            <v-card-text>
              <p>{{ room.description }}</p>
              <p>Giá: {{ room.price }}</p>
            </v-card-text>
            <v-card-actions>
              <router-link :to="'/room/' + room.id">
                Xem chi tiết
              </router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            rooms:[{
id: 1,name: "P102", 
description:"Phòng đơn",
 "pice":1000,
            },{
id: 1,name: "P102", 
description:"Phòng đơn",
 "pice":1000,
            },{
id: 1,name: "P102", 
description:"Phòng đơn",
 "pice":1000,
            }]
        }
    }
};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh ở đây nếu cần */
</style>