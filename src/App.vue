<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App (Updated Version2)"/>
  <UpdateNotifyTemplate>
    <template #content>System reload...</template>
    <template #reload-btn>Reload</template>
  </UpdateNotifyTemplate>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import UpdateNotifyTemplate from "@/plugins/update-notify/UpdateNotifyTemplate.vue";

export default {
  name: 'App',
  components: {
    UpdateNotifyTemplate,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
