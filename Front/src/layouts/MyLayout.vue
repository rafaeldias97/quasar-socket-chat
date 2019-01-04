<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header v-if="verifyRouter()">
      <q-toolbar
        color="grey-10"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title class="text-center">
          Chat WebSocket
        </q-toolbar-title>
        <q-btn flat round icon="exit_to_app" @click="exitToAPP()"></q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {}
  },
  methods: {
    openURL,
    verifyRouter() {
      return this.$route.path !== '/Change'
    },
    exitToAPP() {
      window.clear
      this.$router.push('/Change')
    }
  }
}
</script>

<style>
</style>
