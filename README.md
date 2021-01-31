## kurisu-calendar

> 基于 Vue 的日历组件

### 旧版本

如果大家是因为[这篇文章](https://juejin.cn/post/6844903565777960974)过来的，可以切换到 **master-old** 分支进行查看。

以下是新版本的说明，简略介绍一下两个版本的区别，两者功能样式没有任何变化。

- 新版的日期生成逻辑做了优化
- 新版支持宽度自适应
- 新版生成了依赖包以供大家开箱即用

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