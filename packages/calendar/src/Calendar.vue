<template>
  <div class="calendar" v-if="calendarInit">
    <slot name="header" v-if="needHeader">
      <div class="calendar__header">
        <div class="header__pre" @click="handlePreMonth"></div>
        <div class="header__title">
          {{ selectedYear }}年{{ selectedMonth + 1 }}月{{ selectedDate }}日
        </div>
        <div class="header__next" @click="handleNextMonth"></div>
      </div>
    </slot>

    <div class="calendar__main">
      <div
        class="main__block-head"
        :style="{ height: blockHeight }"
        v-for="(item, index) in calendarHeader"
        :key="index"
      >
        {{ item }}
      </div>

      <div
        :style="{ height: blockHeight }"
        :class="`main__block main__block-${calendarID} ${
          item.type === 'pre' || item.type === 'next' ? 'main__block-not' : ''
        } ${
          item.content === selectedDate && item.type === 'normal'
            ? 'main__block-today'
            : ''
        }`"
        @click="handleDayClick(item)"
        v-for="(item, index) in (outerCalendarData[selectedMonth] || calendarData[selectedMonth])"
        :key="item.type + item.content + `${index}`"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import dayjs from 'dayjs';
import { getAllDaysForYear } from './calendar';

export default {
  name: 'kurisu-calendar',
  props: {
    targetDate: String,
    targetTimestamp: Number,
    needHeader: {
      type: Boolean,
      default: true,
    },
    outerCalendarData: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  data() {
    return {
      calendarID: Date.now(),
      calendarInit: false,
      calendarShow: false,
      calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
      calendarData: [],
      blockHeight: "0px",
      selectedYear: 2013,
      selectedMonth: 9,
      selectedDate: 30,
    };
  },
  computed: {
    isFirstMonth() {
      return this.selectedMonth === 0;
    },
    isLastMonth() {
      return this.selectedMonth === 11;
    },
  },
  mounted() {
    this.init();
    this.$nextTick(function() {
      this.blockHeight = document.querySelector(`.main__block-${this.calendarID}`).offsetWidth + "px";
    });
  },
  methods: {
    init() {
      const initDate = this.targetDate || dayjs(this.targetTimestamp || Date.now()).format('YYYY/MM/DD');
      const [ year, month, date ] = initDate.split('/');
      this.selectedYear = Number(year);
      this.selectedMonth = Number(month) - 1;
      this.selectedDate = Number(date);
      this.calendarData = getAllDaysForYear(Number(year));
      this.$emit('fetchCalendar', { calendar: this.calendarData });
      this.calendarInit = true;
    },

    handleDayClick(item) {
      if (item.type === "normal") {
        this.selectedDate = Number(item.content);
        this.$emit('selectDate', { date: `${this.selectedYear}/${this.selectedMonth + 1}/${this.selectedDate}` });
      }
    },

    handlePreMonth() {
      if (this.isFirstMonth) {
        this.selectedYear = this.selectedYear - 1;
      }
      this.selectedDate = 1;
      this.selectedMonth = this.isFirstMonth ? 11 : this.selectedMonth - 1;
      this.$emit('preMonth', { month: this.selectedMonth });
    },

    handleNextMonth() {
      if (this.isLastMonth) {
        this.selectedYear = this.selectedYear + 1;
      }
      this.selectedDate = 1;
      this.selectedMonth = this.isLastMonth ? 0 : this.selectedMonth + 1;
      this.$emit('nextMonth', { month: this.selectedMonth });
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  background-color: white;
}

.calendar__header {
  color: #2c3135;
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 22px;
  margin: 17px 0;
}

.header__title {
  font-size: 16px;
  letter-spacing: 1px;
}

.header__pre {
  height: 12px;
  width: 12px;
  position: relative;
  &:after {
    content: " ";
    display: inline-block;
    height: 9px;
    width: 9px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(180deg);
    position: absolute;
    top: 50%;
    margin-top: -4px;
    left: 10px;
  }
}

.header__next {
  height: 12px;
  width: 12px;
  position: relative;
  &:after {
    content: " ";
    display: inline-block;
    height: 9px;
    width: 9px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    margin-top: -4px;
    left: -10px;
  }
}

.calendar__main {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.main__block {
  width: calc(100% / 7);
  margin-bottom: 15px;
  border-radius: 2px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
  background-color: #fff;
  flex-shrink: 0;
  box-shadow: 0;
  position: relative;
}

.main__block-piont {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #f93d3a;
  position: absolute;
  left: calc(50% - 2.5px);
  bottom: 0;
}

.main__block-not {
  background-color: #edf2f5;
  color: #7f8fa4;
}

.main__block-today {
  transition: 0.5s all;
  background-color: #f93d3a;
  color: #fff;
  box-shadow: 0 2px 6px rgba(171, 171, 171, 0.5);
}

.main__block-head {
  width: calc(100% / 7);
  margin-bottom: 15px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #7f8fa4;
  background-color: #fff;
  flex-shrink: 0;
}
</style>
