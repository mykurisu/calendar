<template>
  <div class="mywk__calendar">
    <div class="calendar">
      <div class="calendar__header">
          <div class="header__pre">

          </div>
          <div class="header__title">
            {{selectedMonth + 1}}月{{selectedDate}}日
          </div>
          <div class="header__next">

          </div>
      </div>

      <div class="calendar__main">
        <div class="main__block-head" v-for="(item, index) in calendarHeader" :key="index">
          {{item}}
        </div>

        <div class='main__block' v-for="item in totalMountData" :key="item.type + item.content">
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
      // 日历日期初始化
      nowYear: new Date().getFullYear(),
      nowMonth: new Date().getMonth(),
      nowDate: new Date().getDate(),
      nowDay: new Date().getDay(),
      // 当前展现的日历数据
      showMountData: null,
      // 当前所选数据
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      selectedDate: new Date().getDate(),
      // displayDaysPerMonth后的数据
      totalMountData: [],
      // 有课的日期时间戳
      hasLecture: {},
      // 不可以重复请求多次
      is_loading_data: false
    };
  },
  mounted() {
    this.totalMountData = this.displayDaysPerMonth(this.selectedYear)[this.selectedMonth]
  },
  methods: {
    displayDaysPerMonth(year) {
      //定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29;
      }

      let daysPreMonth = [].concat(daysInMonth);
      daysPreMonth.unshift(daysPreMonth.pop());

      let addDaysFromPreMouth = new Array(12).fill(null).map((item, index) => {
        let day = new Date(year, index, 1).getDay();
        if (day === 0) {
          return 6;
        } else {
          return day - 1;
        }
      });

      // console.log(addDaysFromPreMouth)

      let total_calendar_list = new Array(12)
        .fill([])
        .map((mouth, mouthIndex) => {
          let addDays = addDaysFromPreMouth[mouthIndex] + 1,
            daysCount = daysInMonth[mouthIndex],
            daysCountPre = daysPreMonth[mouthIndex],
            mouthDate = [];

          if (addDays >= 7) {
            addDays = addDays - 7;
          }

          for (; addDays > 0; addDays--) {
            let obj = {
              content: daysCountPre--,
              type: "pre"
            };

            mouthDate.unshift(obj);
          }

          for (let i = 0; i < daysCount; ) {
            let obj = {
              content: ++i,
              type: "normal"
            };

            mouthDate.push(obj);
          }
          if (mouthDate.length > 35) {
            for (let i = 42 - mouthDate.length, j = 0; j < i; ) {
              let obj = {
                content: ++j,
                type: "next"
              };

              mouthDate.push(obj);
            }
          } else {
            for (let i = 35 - mouthDate.length, j = 0; j < i; ) {
              let obj = {
                content: ++j,
                type: "next"
              };

              mouthDate.push(obj);
            }
          }
          return mouthDate;
        });
      return total_calendar_list;
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
  display: flex;
  justify-content: center;
}

.calendar {
  width: pxWithVw(355);
  max-width: pxWithVwMax(355);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0 20px 0;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(208, 208, 208, 0.5);

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


