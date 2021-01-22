<template>
  <div id="app">
    <div class="t">
      <SingleMonthCalendar @selectDate="handleA" />
    </div>
    
  </div>
</template>

<script>
import SingleMonthCalendar from './components/SingleMonthCalendar.vue'

export default {
  name: 'App',
  components: {
    SingleMonthCalendar
  },
  methods: {
    handleA({date}) {
      console.log(date);
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  border: 0;
}
.t {
  width: 600px;
  margin: 30px;
}
</style>
