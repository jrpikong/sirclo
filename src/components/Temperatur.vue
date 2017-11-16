<template>
  <div>
    <div class="container">
      <div class="data-row">
        <select style="position: relative;padding-left:0;" v-model="city" @change="getTemperature">
          <option value="Jakarta">Jakarta</option>
          <option value="Tokyo">Tokyo</option>
          <option value="London">London</option>
        </select>
      </div>
      <div class="data-row">
        <div v-if="loading">
          Loading ....
        </div>
        <div v-else="">
          <table border="0" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th><b>{{city}}</b></th>
                <th><b>Temperature</b></th>
                <th><b>Variance</b></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="temperature in temperatures">
                <td>{{temperature.dt | moment("Y-MM-D")}}</td>
                <td>{{temperature.temp.day}} C</td>
                <td>{{temperature.temp.max - temperature.temp.min}} C</td>
              </tr>
              <tr>
                <td><b>Average</b></td>
                <td><b>{{temperatures | sumTemperature()}} C</b></td>
                <td><b>{{temperatures | sumVariance()}} C</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getApiID} from './../env'
  export default {
    data(){
      return{
        city:'Jakarta',
        temperatures:[],
        loading:true
      }
    },
    methods:{
      getTemperature: function () {
        setTimeout(() => {
        this.$http.get('forecast/daily?q='+this.city+'&mode=json&units=metric&cnt=5&APPID='+getApiID())
          .then(response => {
            this.loading =false
            this.temperatures = response.body.list
          })
        },250)
      },
    },
    filters:{
      sumTemperature: function (list) {
        let length_ = list.length;
        return list.reduce(function(sum, next) {
          return sum + Number(next.temp.day) / length_;
        }, 0)
      },
      sumVariance: function (list) {
        let length_ = list.length;
        return list.reduce(function(sum, next) {
          return sum + Number(next.temp.max - next.temp.min) / length_;
        }, 0)
      }
    },
    created(){
      this.getTemperature()
    }
  }
</script>
<style>
  .container{
  }
  .data-row {
    margin-bottom: 10px;
  }
  tr, td {
    border-collapse: collapse;
  }
  td, th {
    padding: 7px 10px 8px;
    border: solid 1px #f7f7f7;
  }
  td:nth-child(1) {text-align: center;}
  td:nth-child(2),
  td:nth-child(3){text-align: right;}
  tbody tr:nth-child(even) {background-color:#fafafa;}
</style>
