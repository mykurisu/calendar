<template>
  <div id="app">
    <div class="t">
      <p>全局引用</p>
      <Calendar
        targetDate="2022/11/01"
        :outer-calendar-data="cc"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  border: 0;
}
p {
  text-align: center;
}
.t {
  display: inline-block;
  width: 300px;
  margin: 30px;
}
.tt {
  display: inline-block;
  width: 375px;
  margin: 30px;
}
</style>
