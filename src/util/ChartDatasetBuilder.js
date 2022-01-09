import TimeUnit from "../constants/TimeUnit";

class ChartDatasetBuilder {
  buildChartDataSets(product, timeSpan) {
    const datasets = [];
    for (let seller of product.sellers.values()) {
      const dataset = this.buildChartDataset(seller, timeSpan);
      if (dataset.data && dataset.data.some((data) => data !== null)) {
        datasets.push(dataset);
      }
    }
    return datasets;
  }

  buildChartDataset(seller, timeSpan) {
    const dataset = {};
    const pointsOfTime = timeSpan.pointsOfTime();
    const priceHistoryEntriesInTimePeriod = seller.priceHistories.filter(
      (history) => Date.parse(history.trackedDate) > pointsOfTime[0]
    );
    dataset.data = this.generateChartData(
      seller.priceHistories,
      priceHistoryEntriesInTimePeriod,
      pointsOfTime
    );
    dataset.label = seller.name;
    dataset.tension = 0.4;
    dataset.fill = false;
    return dataset;
  }

  generateChartData(
    allHistoryEntries,
    inChartRangeHistoryEntries,
    pointsOfTime
  ) {
    const filledHistoryEntries = [];
    let historyEntryToBeFilled = this.getBoundaryStartValue(
      allHistoryEntries,
      inChartRangeHistoryEntries
    );
    pointsOfTime.forEach((pointOfTime) => {
      const historyEntriesInCurrentPeriod = inChartRangeHistoryEntries.filter(
        (historyEntry) => {
          const trackedDate = new Date(historyEntry.trackedDate);
          return this.isDateInTimePeriod(trackedDate, pointOfTime);
        }
      );
      if (historyEntriesInCurrentPeriod.length != 0) {
        historyEntryToBeFilled =
          historyEntriesInCurrentPeriod[
            historyEntriesInCurrentPeriod.length - 1
          ];
      }
      filledHistoryEntries.push(historyEntryToBeFilled);
    });
    return filledHistoryEntries.map((historyEntry) =>
      historyEntry ? historyEntry.price : null
    );
  }

  getBoundaryStartValue(allHistoryEntries, inChartRangeHistoryEntries) {
    const outChartRangeHistories = allHistoryEntries.filter(
      (history) => !inChartRangeHistoryEntries.includes(history)
    );
    return outChartRangeHistories[outChartRangeHistories.length - 1];
  }

  isDateInTimePeriod(date, timePeriod) {
    switch (timePeriod.unit) {
      case TimeUnit.YEAR:
        return date.getFullYear() === timePeriod.getFullYear();
      case TimeUnit.MONTH:
        return (
          date.getFullYear() === timePeriod.getFullYear() &&
          date.getMonth() === timePeriod.getMonth()
        );
      case TimeUnit.DAY:
        return (
          date.getFullYear() === timePeriod.getFullYear() &&
          date.getMonth() === timePeriod.getMonth() &&
          date.getDate() === timePeriod.getDate()
        );
      case TimeUnit.HOUR:
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
