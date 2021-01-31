## kurisu-calendar

> 基于 Vue 的日历组件

### 食用方式

① 直接集成

```js
// 安装依赖
// npm install kurisu-calendar

// main.js
import KurisuCalendar from 'kurisu-calendar';
import 'kurisu-calendar/kurisuCalendar.css';
Vue.use(KurisuCalendar);
// App.vue
<div style="width: 375px">
    <kurisu-calendar />
</div>
```

② Fork改造

这里提供的组件，样式或者功能可能都没法完美贴合大家的需求，这种时候就可以fork仓库按照想要的方式尽情改造~

核心代码：

- packages/calendar/src/calendar.js -- 负责日历日期相关的处理
- packages/calendar/src/calendar.scss -- 日历样式
- packages/calendar/src/Calendar.vue -- 日历组件