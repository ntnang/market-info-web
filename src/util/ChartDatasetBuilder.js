import TimeUnits from "../constants/TimeUnits";

class ChartDatasetBuilder {
  buildChartDataSets(productHistory, timeSpan) {
    const datasets = [];
    for (let sellerHistory of productHistory.sellers.values()) {
      const dataset = this.buildChartDataset(sellerHistory, timeSpan);
      if (dataset.data && dataset.data.some((data) => data !== null)) {
        datasets.push(dataset);
      }
    }
    return datasets;
  }

  buildChartDataset(sellerHistory, timeSpan) {
    const dataset = {};
    const pointsOfTime = timeSpan.pointsOfTime();
    const lastSevenDaysHistories = sellerHistory.priceHistories.filter(
      (history) => Date.parse(history.trackedDate) > pointsOfTime[0]
    );
    dataset.data = this.generateChartData(
      sellerHistory.priceHistories,
      lastSevenDaysHistories,
      pointsOfTime
    );
    dataset.label = sellerHistory.name;
    dataset.tension = 0.4;
    dataset.fill = false;
    return dataset;
  }

  generateChartData(wholeHistories, inChartRangeHistories, pointsOfTime) {
    const filledHistories = [];
    let previousHistory = this.getBoundaryStartValue(
      wholeHistories,
      inChartRangeHistories
    );
    pointsOfTime.forEach((pointOfTime) => {
      const historyEntriesInCurrentPeriod = inChartRangeHistories.filter(
        (history) => {
          const trackedDate = new Date(history.trackedDate);
          return this.isDateInTimePeriod(trackedDate, pointOfTime);
        }
      );
      if (historyEntriesInCurrentPeriod.length != 0) {
        previousHistory =
          historyEntriesInCurrentPeriod[
            historyEntriesInCurrentPeriod.length - 1
          ];
      }
      filledHistories.push(previousHistory);
    });
    return filledHistories.map((history) => (history ? history.price : null));
  }

  getBoundaryStartValue(wholeHistories, inChartRangeHistories) {
    const outChartRangeHistories = wholeHistories.filter(
      (history) => !inChartRangeHistories.includes(history)
    );
    return outChartRangeHistories[outChartRangeHistories.length - 1];
  }

  isDateInTimePeriod(date, timePeriod) {
    switch (timePeriod.unit) {
      case TimeUnits.YEAR:
        return date.getFullYear() === timePeriod.getFullYear();
      case TimeUnits.MONTH:
        return (
          date.getFullYear() === timePeriod.getFullYear() &&
          date.getMonth() === timePeriod.getMonth()
        );
      case TimeUnits.DAY:
        return (
          date.getFullYear() === timePeriod.getFullYear() &&
          date.getMonth() === timePeriod.getMonth() &&
          date.getDate() === timePeriod.getDate()
        );
      case TimeUnits.HOUR:
        return (
          date.getFullYear() === timePeriod.getFullYear() &&
          date.getMonth() === timePeriod.getMonth() &&
          date.getDate() === timePeriod.getDate() &&
          date.getHours() === timePeriod.getHours()
        );
    }
  }
}
export default ChartDatasetBuilder;
