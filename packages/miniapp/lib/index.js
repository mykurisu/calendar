import { getAllDaysForYear, getFormatTime } from './core';

Component({
  properties: {
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

  data: {
    calendarID: Date.now(),
    calendarInit: false,
    calendarShow: false,
    calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
    calendarData: [],
    blockHeight: "0px",
    selectedYear: 2013,
    selectedMonth: 9,
    selectedDate: 30,
  },

  attached() {
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

  methods: {
    init() {
      const initDate = this.data.targetDate || getFormatTime(this.data.targetTimestamp || Date.now());
      const [year, month, date] = initDate.split('/');
      this.setData({
        selectedYear: Number(year),
        selectedMonth: Number(month) - 1,
        selectedDate: Number(date),
        calendarData: getAllDaysForYear(Number(year)),
        calendarInit: true,
      });
      this.triggerEvent('fetchCalendar', { calendar: this.data.calendarData });
    },
  
    handleDayClick(e) {
      const item = e.currentTarget.dataset.item;
      console.log(item);
      if (item.type === "normal") {
        this.setData({
          selectedDate: Number(item.content)
        });
        this.triggerEvent('selectDate', {
          date: `${this.data.selectedYear}/${this.data.selectedMonth + 1}/${this.data.selectedDate}`
        });
      }
    },
  
    handlePreMonth() {
      const isFirstMonth = this.data.selectedMonth === 0;
      if (isFirstMonth) {
        this.setData({
          selectedYear: this.data.selectedYear - 1,
          calendarData: getAllDaysForYear(Number(this.data.selectedYear - 1))
        })
      }
      this.setData({
        selectedDate: 1,
        selectedMonth: isFirstMonth ? 11 : this.data.selectedMonth - 1,
      })
      this.triggerEvent('preMonth', {
        month: this.data.selectedMonth
      });
    },
  
    handleNextMonth() {
      const isLastMonth = this.data.selectedMonth === 11;
      if (isLastMonth) {
        this.setData({
          selectedYear: this.data.selectedYear + 1,
          calendarData: getAllDaysForYear(Number(this.data.selectedYear + 1))
        })
      }
      this.setData({
        selectedDate: 1,
        selectedMonth: isLastMonth ? 0 : this.data.selectedMonth + 1,
      })
      this.triggerEvent('nextMonth', {
        month: this.data.selectedMonth
      });
    },
  }
})