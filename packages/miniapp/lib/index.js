import { getAllDaysForYear, getFormatTime } from './core';

Page({
  data: {
    calendarID: Date.now(),
    needHeader: true,
    calendarInit: false,
    calendarShow: false,
    calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
    calendarData: [],
    blockHeight: "0px",
    selectedYear: 2013,
    selectedMonth: 9,
    selectedDate: 30,
    targetDate: '2021/01/02'
  },
  
  onReady() {
    const _this = this;
    this.init();
    wx.nextTick(() => {
      const query = this.createSelectorQuery();
      query.select('.__main__block-head').boundingClientRect();
      query.exec(function (res) {
        _this.setData({
          blockHeight: res[0].width + 'px'
        })
      })
    })
  },

  init() {
    const initDate = this.data.targetDate;
    const [year, month, date] = initDate.split('/');
    this.setData({
      selectedYear: Number(year),
      selectedMonth: Number(month) - 1,
      selectedDate: Number(date),
      calendarData: getAllDaysForYear(Number(year)),
      calendarInit: true,
    });
    // this.$emit('fetchCalendar', { calendar: this.calendarData });
  },

  handleDayClick(e) {
    const item = e.currentTarget.dataset.item;
    console.log(item);
    if (item.type === "normal") {
      this.setData({
        selectedDate: Number(item.content)
      });
      // this.$emit('selectDate', {
      //   date: `${this.selectedYear}/${this.selectedMonth + 1}/${this.selectedDate}`
      // });
    }
  },

  handlePreMonth() {
    if (this.isFirstMonth) {
      this.selectedYear = this.selectedYear - 1;
      this.calendarData = getAllDaysForYear(Number(this.selectedYear));
    }
    this.selectedDate = 1;
    this.selectedMonth = this.isFirstMonth ? 11 : this.selectedMonth - 1;
    this.$emit('preMonth', {
      month: this.selectedMonth
    });
  },

  handleNextMonth() {
    if (this.isLastMonth) {
      this.selectedYear = this.selectedYear + 1;
      this.calendarData = getAllDaysForYear(Number(this.selectedYear));
    }
    this.selectedDate = 1;
    this.selectedMonth = this.isLastMonth ? 0 : this.selectedMonth + 1;
    this.$emit('nextMonth', {
      month: this.selectedMonth
    });
  },
})