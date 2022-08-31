new Vue({
    el:'#table',
    data() {
      return {
        currentYear: this.getCurrentYear(),
        currentMonth: this.getCurrentMonth(),
        calendarYear: this.getCurrentYear(),
        calendarMonth: this.getCurrentMonth(),
        monthlyCalendar: []
      }
    },
    mounted() {
      this.getMonthlyCalendar()
    },
    computed: {
      firstWday() {
        const firstDay = new Date(this.calendarYear, this.calendarMonth - 1, 1)
        return firstDay.getDay()
      },
      lastDate() {
        const lastDay = new Date(this.calendarYear, this.calendarMonth, 0)
        return lastDay.getDate()
      }
    },
    methods: {
      getCurrentYear() {
        return new Date().getFullYear()
      },
      getCurrentMonth() {
        return new Date().getMonth() + 1
      }, 
      getMonthlyCalendar() {
        let weeklyCalendar = []
        if (this.firstWday >= 2) {
          for (let blank = 1; blank < this.firstWday; blank++) {
            weeklyCalendar.push('')
          }
        } else if (this.firstWday === 0) {
          weeklyCalendar.push('', '', '', '', '', '')
        }
        for (let date = 1; date < this.lastDate + 1; date++) {
          weeklyCalendar.push(date)
          if (weeklyCalendar.length % 7 === 0 || date === this.lastDate) {
            this.monthlyCalendar.push(weeklyCalendar)
            weeklyCalendar = []
          }
        }
      },
      previousMonth() {
        if (this.calendarMonth === 1) {
          this.calendarMonth = 12
          this.calendarYear--
        } else {
          this.calendarMonth--
        }
        this.monthlyCalendar = []
        this.getMonthlyCalendar()
      },
      nextMonth() {
        if (this.calendarMonth === 12) {
          this.calendarMonth = 1
          this.calendarYear++
        } else {
          this.calendarMonth++
        }
        this.monthlyCalendar = []
        this.getMonthlyCalendar()
      }
      }
});