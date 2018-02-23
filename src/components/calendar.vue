<template>
  <div class="mywk__calendar">
    <p class="tips">日历类型--计算单月数据</p>
    <div class="calendar">
      <div class="calendar__header">
          <div class="header__pre" @click="handlePreMonth">

          </div>
          <div class="header__title">
            {{selectedYear}}年{{selectedMonth + 1}}月{{selectedDate}}日
          </div>
          <div class="header__next" @click="handleNextMonth">

          </div>
      </div>

      <div class="calendar__main">
        <div class="main__block-head" v-for="(item, index) in calendarHeader" :key="index">
          {{item}}
        </div>

        <div :class="`main__block ${item.content === selectedDate && 'main__block-today'}`"
        @click="handleDayClick(item)" v-for="(item, index) in displayDaysPerMonth(selectedYear, selectedMonth)" :key="item.type + item.content + `${index}`">
          {{item.content}}
        </div>
      </div>
    </div>

    <p class="tips">日历类型--计算整年数据</p>
    <div class="calendar">
      <div class="calendar__header">
          <div class="header__pre" @click="handlePreMonth">

          </div>
          <div class="header__title">
            {{selectedYear}}年{{selectedMonth + 1}}月{{selectedDate}}日
          </div>
          <div class="header__next" @click="handleNextMonth">

          </div>
      </div>

      <div class="calendar__main">
        <div class="main__block-head" v-for="(item, index) in calendarHeader" :key="index">
          {{item}}
        </div>

        <div :class="`main__block ${(item.type === 'pre' || item.type === 'next') ? 'main__block-not' : ''} ${(item.content === selectedDate && item.type === 'normal') && 'main__block-today'}`"
         @click="handleDayClick(item)" v-for="(item, index) in displayDaysPerMonthT(selectedYear)[selectedMonth]" :key="item.type + item.content + `${index}`">
          {{item.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      selectedDate: new Date().getDate()
    };
  },
  methods: {
    displayDaysPerMonth(year, month) {
      //定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29;
      }
      let targetDay = new Date(year, month, 1).getDay();
      let total_calendar_list = [];
      let preNum = targetDay;
      let nextNum = 0;
      if (targetDay > 0) {
        for (let i = 0; i < preNum; i++) {
          let obj = {
            type: "pre",
            content: ""
          };
          total_calendar_list.push(obj);
        }
      }
      for (let i = 0; i < daysInMonth[month]; i++) {
        let obj = {
          type: "normal",
          content: i + 1
        };
        total_calendar_list.push(obj);
      }
      if (total_calendar_list.length > 35) {
        nextNum = 42 - total_calendar_list.length;
      } else {
        nextNum = 35 - total_calendar_list.length;
      }

      if (month === 1 && new Date(year, month, 0).getDay() === 6) {
        nextNum = 0
      }
      
      for (let i = 0; i < nextNum; i++) {
        let obj = {
          type: "next",
          content: ""
        };
        total_calendar_list.push(obj);
      }
      return total_calendar_list;
    },
    displayDaysPerMonthT(year) {
      //定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29;
      }

      let daysPreMonth = [].concat(daysInMonth);
      daysPreMonth.unshift(daysPreMonth.pop());

      let addDaysFromPreMonth = new Array(12).fill(null).map((item, index) => {
        let day = new Date(year, index, 1).getDay();
        if (day === 0) {
          return 6;
        } else {
          return day - 1;
        }
      });

      let total_calendar_list = new Array(12)
        .fill([])
        .map((month, monthIndex) => {
          let addDays = addDaysFromPreMonth[monthIndex] + 1,
            daysCount = daysInMonth[monthIndex],
            daysCountPre = daysPreMonth[monthIndex],
            monthDate = [];

          if (addDays >= 7) {
            addDays = addDays - 7;
          }

          for (; addDays > 0; addDays--) {
            let obj = {
              content: daysCountPre--,
              type: "pre"
            };

            monthDate.unshift(obj);
          }

          for (let i = 0; i < daysCount; ) {
            let obj = {
              content: ++i,
              type: "normal"
            };

            monthDate.push(obj);
          }
          if (monthDate.length > 35) {
            for (let i = 42 - monthDate.length, j = 0; j < i; ) {
              let obj = {
                content: ++j,
                type: "next"
              };

              monthDate.push(obj);
            }
          } else {
            for (let i = 35 - monthDate.length, j = 0; j < i; ) {
              let obj = {
                content: ++j,
                type: "next"
              };

              monthDate.push(obj);
            }
          }
          return monthDate;
        });
      return total_calendar_list;
    },
    handleDayClick(item) {
      if (item.type === 'normal') {
        // do anything...
        this.selectedDate = Number(item.content)
      }
    },
    handlePreMonth() {
      if (this.selectedMonth === 0) {
        this.selectedYear = this.selectedYear - 1
        this.selectedMonth = 11
        this.selectedDate = 1
      } else {
        this.selectedMonth = this.selectedMonth - 1
        this.selectedDate = 1
      }
    },
    handleNextMonth() {
      if (this.selectedMonth === 11) {
        this.selectedYear = this.selectedYear + 1
        this.selectedMonth = 0
        this.selectedDate = 1
      } else {
        this.selectedMonth = this.selectedMonth + 1
        this.selectedDate = 1
      }
    }
  }
};
</script>

<style lang="scss">
@function pxWithVw($n) {
  @return 100vw * $n / 375;
}

@function pxWithVwMax($n) {
  @return 480px * $n / 375;
}
.mywk__calendar {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.tips {
  margin: 15px 0 0 0;
  text-align: center;
}

.calendar {
  flex-shrink: 0;
  width: pxWithVw(355);
  max-width: pxWithVwMax(355);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0 20px 0;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);

  .calendar__header {
    color: #2c3135;
    font-size: 16px;
    width: pxWithVw(315);
    max-width: pxWithVwMax(315);
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 22px;
    margin-top: 17px;

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
        right: 2px;
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
        right: 2px;
      }
    }
  }

  .calendar__main {
    width: pxWithVw(315);
    max-width: pxWithVwMax(315);
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 19px;

    .main__block {
      width: pxWithVw(44);
      height: pxWithVw(44);
      max-width: pxWithVwMax(44);
      max-height: pxWithVwMax(44);
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

      .main__block-piont {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #f93d3a;
        position: absolute;
        left: calc(50% - 2.5px);
        bottom: 0;
      }
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
      width: pxWithVw(44);
      height: pxWithVw(44);
      max-width: pxWithVwMax(44);
      max-height: pxWithVwMax(44);
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
  }
}
</style>


