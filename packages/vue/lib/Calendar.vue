<template>
  <div class="__calendar" v-if="calendarInit">
    <slot name="header" v-if="needHeader">
      <div class="__calendar__header">
        <div class="__header__pre" @click="handlePreMonth"></div>
        <div class="__header__title">
          {{ selectedYear }}年{{ selectedMonth + 1 }}月{{ selectedDate }}日
        </div>
        <div class="__header__next" @click="handleNextMonth"></div>
      </div>
    </slot>

    <div class="__calendar__main">
      <div
        class="__main__block-head"
        :style="{ height: blockHeight }"
        v-for="(item, index) in calendarHeader"
        :key="index"
      >
        {{ item }}
      </div>

      <div
        :style="{ height: blockHeight }"
        :class="`__main__block __main__block-${calendarID} ${
          item.type === 'pre' || item.type === 'next' ? '__main__block-not' : ''
        } ${
          item.content === selectedDate && item.type === 'normal'
            ? '__main__block-today'
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
import { getAllDaysForYear, coreDayjs } from '@mykurisu/calendar-core';

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
      this.blockHeight = document.querySelector(`.__main__block-${this.calendarID}`).offsetWidth + "px";
    });
  },
  methods: {
    init() {
      const initDate = this.targetDate || coreDayjs.dayjs(this.targetTimestamp || Date.now()).format('YYYY/MM/DD');
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
        this.calendarData = getAllDaysForYear(Number(this.selectedYear));
      }
      this.selectedDate = 1;
      this.selectedMonth = this.isFirstMonth ? 11 : this.selectedMonth - 1;
      this.$emit('preMonth', { month: this.selectedMonth });
    },

    handleNextMonth() {
      if (this.isLastMonth) {
        this.selectedYear = this.selectedYear + 1;
        this.calendarData = getAllDaysForYear(Number(this.selectedYear));
      }
      this.selectedDate = 1;
      this.selectedMonth = this.isLastMonth ? 0 : this.selectedMonth + 1;
      this.$emit('nextMonth', { month: this.selectedMonth });
    },
  },
};
</script>
