/* eslint-disable */
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

export { getAllDaysForYear };
