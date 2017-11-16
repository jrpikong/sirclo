<template>
  <div>
    <select v-model="city">
      <option value="Jakarta">Jakarta</option>
      <option value="Tokyo">Tokyo</option>
      <option value="London">London</option>
    </select>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        city:''
      }
    },
    methods:{

    }
  }
</script>
