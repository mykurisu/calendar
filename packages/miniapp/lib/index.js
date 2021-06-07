// index.js
// 获取应用实例
const app = getApp()

function getAllDaysForYear(year) {
  /**
   * monthData 每月数据 用于最后输出
   * daysInMonth 每个月的天数
   * specialDaysInMonth 每个月第一天和最后一天的星期
   */
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // 对闰年二月天数特殊处理
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    daysInMonth[1] = 29;
  }
  const monthData = new Array(12).fill(null);

  const specialDaysInMonth = monthData.slice(0).map((m, i) => {
    return [
      new Date(year, i, 1).getDay(),
      new Date(year, i, daysInMonth[i]).getDay(),
    ];
  });

  return monthData.map((m, i) => {
    const month = [];
    const pre = preDaysCreator(
      daysInMonth[i === 0 ? 11 : i - 1],
      specialDaysInMonth[i][0]
    );
    const normal = normalDaysCreator(daysInMonth[i]);
    const next = nextDaysCreator(specialDaysInMonth[i][1]);
    return month.concat(pre, normal, next);
  });
}

function preDaysCreator(preLastDay, firstDay) {
  const preDays = [];
  for (; firstDay > 0; firstDay--) {
    let obj = {
      content: preLastDay--,
      type: "pre",
    };

    preDays.push(obj);
  }
  return preDays;
}

function nextDaysCreator(lastDay) {
  const nextDays = [];
  const count = 6 - lastDay;
  for (let i = 0; i < count; i++) {
    let obj = {
      content: i + 1,
      type: "next",
    };

    nextDays.push(obj);
  }
  return nextDays;
}

function normalDaysCreator(days) {
  const normalDays = [];
  for (let i = 0; i < days; i++) {
    let obj = {
      content: i + 1,
      type: "normal",
    };

    normalDays.push(obj);
  }
  return normalDays;
}

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