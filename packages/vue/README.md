① 直接集成

```js
// 安装依赖
// npm install @mykurisu/calendar-component-vue

// App.vue
<div style="width: 375px">
    <calendar />
</div>

<script>
import Calendar from '@mykurisu/calendar-component-vue'

export default {
  name: 'App',
  components: {
    Calendar
  }
}
</script>
```

② Fork改造

请参考[@mykurisu/calendar](https://github.com/mykurisu/calendar)的修改说明
