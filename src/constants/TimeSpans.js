import TimeUnits from "../constants/TimeUnits";

class TimeSpans {
  TODAY = {
    label: "Today",
    unit: TimeUnits.HOUR,
    pointsOfTime: () => {
      const date = new Date();
      const hourOfDay = date.getHours();
      return [...Array(hourOfDay)]
        .map((_, i) => {
          date.setHours(date.getHours() - i);
          return date;
        })
        .reverse();
    },
  };
  LAST_24_HOURS = {
    label: "Last 24 hours",
    unit: TimeUnits.HOUR,
    pointsOfTime: () => {
      const date = new Date();
      return [...Array(24)]
        .map((_, i) => {
          date.setHours(date.getHours() - i);
          return date;
        })
        .reverse();
    },
  };
  THIS_WEEK = {
    label: "This week",
    unit: TimeUnits.DAY,
    pointsOfTime: () => {
      const date = new Date();
      const dayOfWeek = date.getDay();
      return [...Array(dayOfWeek)]
        .map((_, i) => {
          date.setDate(date.getDate() - i);
          return date;
        })
        .reverse();
    },
  };
  LAST_7_DAYS = {
    label: "Last 7 days",
    unit: TimeUnits.DAY,
    pointsOfTime: () => {
      const date = new Date();
      return [...Array(7)]
        .map((_, i) => {
          date.setDate(date.getDate() - i);
          return date;
        })
        .reverse();
    },
  };
  THIS_MONTH = {
    label: "This month",
    unit: TimeUnits.DAY,
    pointsOfTime: () => {
      const date = new Date();
      const dayOfMonth = date.getDate();
      return [...Array(dayOfMonth)]
        .map((_, i) => {
          date.setDate(date.getDate() - i);
          return date;
        })
        .reverse();
    },
  };
  LAST_30_DAYS = {
    label: "Last 30 days",
    unit: TimeUnits.DAY,
    pointsOfTime: () => {
      const date = new Date();
      return [...Array(30)]
        .map((_, i) => {
          date.setDate(date.getDate() - i);
          return date;
        })
        .reverse();
    },
  };
  THIS_YEAR = {
    label: "This year",
    unit: TimeUnits.MONTH,
    pointsOfTime: () => {
      const date = new Date();
      const monthOfYear = date.getMonth();
      return [...Array(monthOfYear)]
        .map((_, i) => {
          date.setMonth(date.getMonth() - i);
          return date;
        })
        .reverse();
    },
  };
  LAST_12_MONTH = {
    label: "Last 12 months",
    unit: TimeUnits.MONTH,
    pointsOfTime: () => {
      const date = new Date();
      return [...Array(12)]
        .map((_, i) => {
          date.setMonth(date.getMonth - i);
          return date;
        })
        .reverse();
    },
  };
}
export default TimeSpans;
