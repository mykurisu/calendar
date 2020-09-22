<template>
  <div id="app">
    <SingleMonthCalendar />
  </div>
</template>

<script>
import SingleMonthCalendar from './components/SingleMonthCalendar.vue'

export default {
  name: 'App',
  components: {
    SingleMonthCalendar
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
