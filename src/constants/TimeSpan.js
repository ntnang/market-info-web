import TimeUnit from "./TimeUnit";

class TimeSpan {
  TODAY = {
    id: "TODAY",
    label: "Today",
    value: {
      unit: TimeUnit.HOUR,
      displayTimeFormat: { timeStyle: "short" },
      pointsOfTime: () => {
        const currentDate = new Date();
        const hourOfDay = currentDate.getHours();
        return [...Array(hourOfDay)]
          .map((_, i) => {
            const date = new Date();
            date.setHours(date.getHours() - i);
            return date;
          })
          .reverse();
      },
    },
  };
  LAST_24_HOURS = {
    id: "LAST_24_HOURS",
    label: "Last 24 hours",
    value: {
      unit: TimeUnit.HOUR,
      displayTimeFormat: { timeStyle: "short" },
      pointsOfTime: () => {
        return [...Array(24)]
          .map((_, i) => {
            const date = new Date();
            date.setHours(date.getHours() - i);
            return date;
          })
          .reverse();
      },
    },
  };
  THIS_WEEK = {
    id: "THIS_WEEK",
    label: "This week",
    value: {
      unit: TimeUnit.DAY,
      displayTimeFormat: { weekday: "long" },
      pointsOfTime: () => {
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        return [...Array(dayOfWeek + 1)]
          .map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date;
          })
          .reverse();
      },
    },
  };
  LAST_7_DAYS = {
    id: "LAST_7_DAYS",
    label: "Last 7 days",
    value: {
      unit: TimeUnit.DAY,
      displayTimeFormat: { weekday: "short" },
      pointsOfTime: () => {
        return [...Array(7)]
          .map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date;
          })
          .reverse();
      },
    },
  };
  THIS_MONTH = {
    id: "THIS_MONTH",
    label: "This month",
    value: {
      unit: TimeUnit.DAY,
      displayTimeFormat: { day: "numeric" },
      pointsOfTime: () => {
        const currentDate = new Date();
        const dayOfMonth = currentDate.getDate();
        return [...Array(dayOfMonth)]
          .map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date;
          })
          .reverse();
      },
    },
  };
  LAST_30_DAYS = {
    id: "LAST_30_DAYS",
    label: "Last 30 days",
    value: {
      unit: TimeUnit.DAY,
      displayTimeFormat: { dateStyle: "short" },
      pointsOfTime: () => {
        return [...Array(30)]
          .map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date;
          })
          .reverse();
      },
    },
  };
  THIS_YEAR = {
    id: "THIS_YEAR",
    label: "This year",
    value: {
      unit: TimeUnit.MONTH,
      displayTimeFormat: { month: "short" },
      pointsOfTime: () => {
        const currentDate = new Date();
        const monthOfYear = currentDate.getMonth();
        return [...Array(monthOfYear + 1)]
          .map((_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            return date;
          })
          .reverse();
      },
    },
  };
  LAST_12_MONTHS = {
    id: "LAST_12_MONTHS",
    label: "Last 12 months",
    value: {
      unit: TimeUnit.MONTH,
      displayTimeFormat: { month: "short", year: "numeric" },
      pointsOfTime: () => {
        return [...Array(12)]
          .map((_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            return date;
          })
          .reverse();
      },
    },
  };

  VALUES = [
    this.TODAY,
    this.LAST_24_HOURS,
    this.THIS_WEEK,
    this.LAST_7_DAYS,
    this.THIS_MONTH,
    this.LAST_30_DAYS,
    this.THIS_YEAR,
    this.LAST_12_MONTHS,
  ];
}
export default TimeSpan;
