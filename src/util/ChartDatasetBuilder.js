import ColorThief from "colorthief/dist/color-thief.mjs";
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
    dataset.data = this.generateChartData(seller.priceHistories, timeSpan);
    dataset.label = seller.name;
    dataset.tension = 0.4;
    dataset.fill = false;

    const googleProxyURL =
      "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = googleProxyURL + encodeURIComponent(seller.logoUrl);

    const colorThief = new ColorThief();
    if (img.complete) {
      colorThief.getColor(img);
    } else {
      img.addEventListener("load", () => {
        dataset.borderColor = `rgb(${colorThief.getColor(img).join()})`;
      });
    }

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
