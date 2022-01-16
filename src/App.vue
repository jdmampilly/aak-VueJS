<template>
  <div id="app">
    <div>
      <b-navbar type="light" variant="light" >
        <b-navbar-nav>
          <!-- <b-nav-item class="m-md-2" href="#/">Home</b-nav-item> -->
          <b-nav-item-dropdown text="Administrative" class="m-md-2">
            <b-dropdown-item href="#/EmployeeList"
              >Month Setup/Post</b-dropdown-item
            >
            <b-dropdown-item href="#">Post Loan Transaction</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
             <b-col>
          <span class="d-block p-3 bg-secondary text-white spacer">
            AKBHAR AL KHALEEJ - PAYROLL
          </span>
        </b-col>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [{}],
      menuItems: [{}]
    }
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
