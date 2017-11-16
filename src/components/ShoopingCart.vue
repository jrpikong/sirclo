<template>
  <div>
    <h1>List Product</h1>
    <div v-for="product in products">
      {{product}} - <button @click="addProduct(product,1)">Add To Cart</button><p></p>
    </div>

    <h1>Your Chart</h1>
      <div v-if="carts" v-for="cart in carts">
        <div>{{cart.code}} ({{cart.qty}}) <button @click="removeProduct(cart.code)">Remove Cart</button></div><p></p>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        products:['Baju Merah Mantap','Bukuku','Baju Biru Mantab','Singlet Hijau','ProdukBohongan'],
        carts:[]
      }
    },
    methods:{
      addProduct: function (productCode,quantity) {
        /*di filter dulu data pada array carts sudah ada apa belum denga productCode yang
        * akan di input, jika belum ada akan membuat row baru
        * jika productCode sudah ada maka akan menambahkan qtynya saya (masuk pada kondisi else)
        *
        * */
        const record = this.carts.find(product => product.code === productCode)
        if (!record) {
          /*jika record data productCode baru belum ada akan di push ke array carts*/
        this.carts.push({
          code:productCode,
          qty:quantity
        })}
        else{
          record.qty++
        }
      },
      showCart:function () {
        /*dengan kasus ini sebenarnya data cart bisa langsung di binding ke view
        * tanpa harus membuat function showCart
        * jika ingin menggunakan function maka bisa seperti ini
        * */
        return this.carts
      },
      removeProduct:function (id) {
        //index dulu data mana yang akan di hapus
        const index = this.carts.findIndex(added => added.code === id)
        //Jika Index sudah di temukan maka tinggal meremove array dengan function splice()
        if(index) {
          this.carts.splice(index, 1)
        }
      }
    },
    created(){
      /*akan menampilkan pada console log data yang ada pada cart
      * */
      console.log(this.showCart())
    }
  }
</script>
