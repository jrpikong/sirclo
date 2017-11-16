<template>
  <div>
    <select v-model="city" @change="getTemperature">
      <option value="Jakarta">Jakarta</option>
      <option value="Tokyo">Tokyo</option>
      <option value="London">London</option>
    </select>
    <table v-if="loading">
      <tr>
        <th><b>{{city}}</b></th>
        <th><b>Temperature</b></th>
        <th><b>Variance</b></th>
      </tr>
      <tr v-for="temperature in temperatures">
        <td>{{temperature.dt}}</td>
        <td>{{temperature.temp.day}}</td>
        <td>{{temperature.temp.min - temperature.temp.max}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {getApiID} from './../env'
  export default {
    data(){
      return{
        city:'',
        temperatures:[],
        loading:false
      }
    },
    methods:{
      getTemperature: function () {
        setTimeout(() => {
        this.$http.get('forecast/daily?q='+this.city+'&mode=json&units=metric&cnt=5&APPID='+getApiID())
          .then(response => {
            this.loading =true
            this.temperatures = response.body.list
          })
        },250)
      }
    }
  }
</script>
