import React, { useState, useMemo, useLayoutEffect } from 'react'
import dayjs from 'dayjs';
import { getAllDaysForYear } from '@mykurisu/calendar-core';
import '@mykurisu/calendar-core/dist/index.css';


function Calendar(props) {
    const { targetDate = '', targetTimestamp = 0, needHeader = true, outerCalendarData = [] } = props;
    const calendarID = Date.now();
    const calendarHeader = ['日', '一', '二', '三', '四', '五', '六'];

    const [calendarInit, setCalendarInit] = useState(false);
    const [calendarData, setCalendarData] = useState([]);
    const [blockHeight, setBlockHeight] = useState('0px');
    const [selectedYear, setSelectedYear] = useState(2021);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDate, setSelectedDate] = useState(27);

    const isFirstMonth = useMemo(() => selectedMonth === 0);
    const isLastMonth = useMemo(() => selectedMonth === 11);

    const handleCalendarInit = () => {
        const initDate = targetDate || dayjs(targetTimestamp || Date.now()).format('YYYY/MM/DD');
        const [year, month, date] = initDate.split('/');
        setSelectedYear(Number(year));
        setSelectedMonth(Number(month) - 1);
        setSelectedDate(Number(date));
        setCalendarData(getAllDaysForYear(Number(year)));
        setCalendarInit(true);
    }

    const handleDayClick = (item) => {
        if (item.type === "normal") {
            setSelectedDate(Number(item.content));
            props && props.selectDate && props.selectDate({ date: `${this.selectedYear}/${this.selectedMonth + 1}/${this.selectedDate}` });
        }
    }

    const handlePreMonth = () => {
        if (isFirstMonth) {
            setSelectedYear(selectedYear - 1);
            setCalendarData(getAllDaysForYear(selectedYear));
        }
        setSelectedDate(1);
        setSelectedMonth(isFirstMonth ? 11 : selectedMonth - 1);
        props && props.preMonth && props.preMonth({ month: selectedMonth });
    }

    const handleNextMonth = () => {
        if (isLastMonth) {
            setSelectedYear(selectedYear + 1);
            setCalendarData(getAllDaysForYear(selectedYear));
        }
        setSelectedDate(1);
        setSelectedMonth(isLastMonth ? 0 : selectedMonth + 1);
        props && props.nextMonth && props.nextMonth({ month: selectedMonth });
    }

    useLayoutEffect(() => {
        console.log(document.querySelector('.__main__block-head'))
        setBlockHeight(document.querySelector('.__main__block-head').offsetWidth + "px");
    }, [calendarData]);

    if (!calendarInit) {
        handleCalendarInit();
    }

    const renderHeader = () => (
        <div className="__calendar__header">
            <div className="__header__pre" onClick={() => handlePreMonth()}></div>
            <div className="__header__title">
                {selectedYear}年{selectedMonth + 1}月{selectedDate}日
                    </div>
            <div className="__header__next" onClick={() => handleNextMonth()}></div>
        </div>
    )

    const renderMainHeader = (item, i) => (
        <div
            className="__main__block-head"
            style={{ height: blockHeight }}
            key={`__main__block-head-${i}`}
        >
            {item}
        </div>
    )

    const handleBlockClass = (item) => {
        const { type, content } = item;
        if (type === 'pre' || type === 'next') {
            return `__main__block __main__block-${calendarID} __main__block-not`;
        }
        if (content === selectedDate) {
            return `__main__block __main__block-${calendarID} __main__block-today`;
        }
        return `__main__block __main__block-${calendarID}`;
    }

    const renderMainBlock = (item, i) => (
        <div
            className={handleBlockClass(item)}
            style={{ height: blockHeight }}
            onClick={() => handleDayClick(item)}
            key={`__main__block-${i}`}
        >
            {item.content}
        </div>
    )

    if (!calendarInit) return null;

    return (
        <div className="__calendar">
            {needHeader && renderHeader()}

            <div className="__calendar__main">
                {calendarHeader.map((h, i) => renderMainHeader(h, i))}

                {(outerCalendarData[selectedMonth] || calendarData[selectedMonth]).map((c, i) => renderMainBlock(c, i))}
            </div>
        </div>
    );
}

export default Calendar;
