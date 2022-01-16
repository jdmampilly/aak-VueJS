<template>
  <div class="row">
       <form>
      <div class="main">
          <div>
            <label>Customer</label>
          </div>
         <label>Customer Id</label> <input v-model="customer.id">
         <label>Customer Name</label> <input v-model="customer.name">
       </div>
      <div >
        <button  @click.prevent="save">Add Employee</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
    // here goes all the data required for the form, it should be as json objects
      customer: { id: '', name: '' }
    }
  },
  methods: {

    // here goes all the methods and functions
    save () {
      alert('Saving new customer..' + this.customer.id + ',' + this.customer.name)
      // call javascript function to post to database
    }
  },
  created () {
    // anything you want to be called when creating the form
  },
  mounted () {
    // anything you want to be called when mounting the form
  },
  computed: {
    // any computed values goes here
  },
  components: {
  }
}
</script>
<style  scoped>
.main {
  width: 95%;
  margin-left: 40px;
  margin-right: 40px;
  /* font-family: "Arial", Times, serif; */
  font-size: small;
}
</style>
