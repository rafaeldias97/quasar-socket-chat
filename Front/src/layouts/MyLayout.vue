<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header v-if="verifyRouter()">
      <q-toolbar
        color="dark"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title class="text-center">
          Chat WebSocket
        </q-toolbar-title>
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
      return !this.$route.path === '/Change'
    }
  }
}
</script>

<style>
</style>
