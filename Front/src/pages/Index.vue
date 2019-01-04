<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  mounted() {
    if(this.hasConection())
      this.$router.push('/Change')
    else
      this.$router.push('/Chat')
  },
  methods: {
    hasConection() {
      var has = (window.localStorage.getItem('name') == null 
        && window.localStorage.getItem('image') == null)
      console.log(has)
      return has
    }
  }
}
</script>
