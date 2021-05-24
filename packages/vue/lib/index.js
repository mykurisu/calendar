import Calendar from './Calendar.vue'
import '@mykurisu/calendar-core/dist/index.css';

// 为组件提供 install 安装方法，供按需引入
Calendar.install = function (Vue) {
  Vue.component(Calendar.name, Calendar)
}

// 默认导出组件
export default Calendar