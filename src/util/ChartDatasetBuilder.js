class ChartDatasetBuilder {
  chartDatasetHexColors = [
    "#ff9900",
    "#ffcc00",
    "#ffcc66",
    "#ffcc99",
    "#ffcccc",
    "#ffcccc",
    "#ffccff",
    "#cc99ff",
    "#cc99ff",
    "#6666ff",
    "#cccc00",
    "#ccff33",
    "#ccff66",
    "#ccff99",
    "#ccffcc",
    "#ccffff",
    "#66ccff",
    "#3399ff",
  ];

  buildChartDataSets(variant, sellersMetadata, timeSpan) {
    const datasets = [];
    variant.sellers.forEach((seller, index) => {
      const dataset = this.buildChartDataset(
        seller,
        sellersMetadata,
        timeSpan,
        this.chartDatasetHexColors[index % this.chartDatasetHexColors.length]
      );
      datasets.push(dataset);
    });
    return datasets;
  }

  buildChartDataset(seller, sellersMetadata, timeSpan, color) {
    const dataset = {};
    dataset.data = this.generateChartData(seller.priceHistories, timeSpan);
    dataset.label = sellersMetadata.find(
      (sellerMetadata) => sellerMetadata.id === seller.id
    )?.name;
    dataset.tension = 0.4;
    dataset.fill = false;
    dataset.borderColor = color;
    return dataset;
  }

  generateChartData(allHistoryEntries, timeSpan) {
    const filledHistoryEntries = [];
    const pointsOfTime = timeSpan.pointsOfTime();
    const historyEntriesInTimePeriod = allHistoryEntries.filter(
      (history) => Date.parse(history.trackedDate) >= pointsOfTime[0]
    );
    let historyEntryToBeFilled = this.getBoundaryStartValue(
      allHistoryEntries,
      historyEntriesInTimePeriod
    );
    pointsOfTime.forEach((pointOfTime) => {
      const historyEntriesInCurrentPeriod = historyEntriesInTimePeriod.filter(
        (historyEntry) => {
          const trackedDate = new Date(historyEntry.trackedDate);
          return this.isDateInTimePeriod(
            trackedDate,
            pointOfTime,
            timeSpan.unit
          );
        }
      );
      if (historyEntriesInCurrentPeriod.length !== 0) {
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

  isDateInTimePeriod(date, pointOfTime, timeUnit) {
    switch (timeUnit) {
      case "YEAR":
        return date.getFullYear() === pointOfTime.getFullYear();
      case "MONTH":
        return (
          date.getFullYear() === pointOfTime.getFullYear() &&
          date.getMonth() === pointOfTime.getMonth()
        );
      case "DAY":
        return (
          date.getFullYear() === pointOfTime.getFullYear() &&
          date.getMonth() === pointOfTime.getMonth() &&
          date.getDate() === pointOfTime.getDate()
        );
      case "HOUR":
        return (
          date.getFullYear() === pointOfTime.getFullYear() &&
          date.getMonth() === pointOfTime.getMonth() &&
          date.getDate() === pointOfTime.getDate() &&
          date.getHours() === pointOfTime.getHours()
        );
    }
  }
}
export default ChartDatasetBuilder;
