<template>
<div>
 <!-- <Format template="XXX,XXX,XXX,XXX.XXX"/>
 <input type="text" v-model="num" /> -->
 NOT AUTHORIZED TO VIEW THIS PAGE
</div>

</template>

<script>
// import Format from './Format.vue'
export default {
  data () {
    return {
      num: 0
    }
  },
  components: {
    // Format
  },
  watch: {
    num () {
      console.log(this.num)
      this.num = this.num.replace(/[^0-9]/g, '')
        .replace(this.num.toFixed(2))
    }
  }
}
</script>
