import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ProductService from "../service/ProductService";

const Dashboard = (props) => {
  const [latestProduct, setLatestProduct] = useState({
    name: "",
    history: {
      labels: [],
      datasets: [],
    },
  });

  const productService = new ProductService();

  const weekDayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const lastSevenDates = [...Array(7)]
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    })
    .reverse();

  useEffect(async () => {
    const lastSevenWeekDayNames = lastSevenDates.map(
      (date) => weekDayNames[date.getDay()]
    );
    const productHistories =
      await productService.findLastTrackedProductHistories();
    setLatestProduct({
      name: productHistories.name,
      history: {
        labels: lastSevenWeekDayNames,
        datasets: buildChartDataSet(productHistories),
      },
    });
  }, [props.lastChangeDateTime]);

  const buildChartDataSet = (productHistory) => {
    const datasets = [];
    for (let sellerHistory of productHistory.sellers.values()) {
      const lastSevenDaysDataSet = buildLastSevenDaysDataSet(sellerHistory);
      if (
        lastSevenDaysDataSet.data &&
        lastSevenDaysDataSet.data.some((data) => data !== null)
      ) {
        datasets.push(lastSevenDaysDataSet);
      }
    }
    return datasets;
  };

  const buildLastSevenDaysDataSet = (sellerHistory) => {
    const dataset = {};
    const lastSevenDaysHistories = sellerHistory.priceHistories.filter(
      (history) => Date.parse(history.trackedDate) > getDateOfSevenDaysAgo()
    );
    dataset.data = generateChartData(
      sellerHistory.priceHistories,
      lastSevenDaysHistories,
      lastSevenDates
    );
    dataset.label = sellerHistory.name;
    dataset.tension = 0.4;
    dataset.fill = false;
    return dataset;
  };

  const getDateOfSevenDaysAgo = () => {
    return lastSevenDates[0];
  };

  const generateChartData = (
    wholeHistories,
    inChartRangeHistories,
    chartDates
  ) => {
    const filledHistories = [];
    let previousHistory = getBoundaryStartValue(
      wholeHistories,
      inChartRangeHistories
    );
    chartDates.forEach((date) => {
      const historiesOnCurrentDate = inChartRangeHistories.filter((history) => {
        const trackedDate = new Date(history.trackedDate);
        return (
          trackedDate.getDate() === date.getDate() &&
          trackedDate.getMonth() === date.getMonth() &&
          trackedDate.getFullYear() === date.getFullYear()
        );
      });
      if (historiesOnCurrentDate.length != 0) {
        previousHistory =
          historiesOnCurrentDate[historiesOnCurrentDate.length - 1];
      }
      filledHistories.push(previousHistory);
    });
    return filledHistories.map((history) => (history ? history.price : null));
  };

  const getBoundaryStartValue = (wholeHistories, inChartRangeHistories) => {
    const outChartRangeHistories = wholeHistories.filter(
      (history) => !inChartRangeHistories.includes(history)
    );
    return outChartRangeHistories[outChartRangeHistories.length - 1];
  };

  return (
    <div className="grid">
      <div className="col-12 xl:col-12">
        <div className="card">
          <h5>{latestProduct.name}</h5>
          <Chart type="line" data={latestProduct.history} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
