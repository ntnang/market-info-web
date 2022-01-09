import TimeUnits from "../constants/TimeUnits";

class TimeSpans {
  TODAY = {
    label: "Today",
    unit: TimeUnits.HOUR,
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
    unit: TimeUnits.HOUR,
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
    unit: TimeUnits.DAY,
    pointsOfTime: () => {
      const currentDate = new Date();
      const dayOfWeek = currentDate.getDay();
      return [...Array(dayOfWeek)]
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
    unit: TimeUnits.DAY,
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
    unit: TimeUnits.DAY,
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
    unit: TimeUnits.DAY,
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
    unit: TimeUnits.MONTH,
    pointsOfTime: () => {
      const currentDate = new Date();
      const monthOfYear = currentDate.getMonth();
      return [...Array(monthOfYear)]
        .map((_, i) => {
          const date = new Date();
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
      return [...Array(12)]
        .map((_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth - i);
          return date;
        })
        .reverse();
    },
  };
}
export default TimeSpans;
