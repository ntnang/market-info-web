import TimeUnit from "./TimeUnit";

class TimeSpan {
  TODAY = {
    label: "Today",
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
  };
  LAST_24_HOURS = {
    label: "Last 24 hours",
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
  };
  THIS_WEEK = {
    label: "This week",
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
  };
  LAST_7_DAYS = {
    label: "Last 7 days",
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
  };
  THIS_MONTH = {
    label: "This month",
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
  };
  LAST_30_DAYS = {
    label: "Last 30 days",
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
  };
  THIS_YEAR = {
    label: "This year",
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
  };
  LAST_12_MONTHS = {
    label: "Last 12 months",
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
